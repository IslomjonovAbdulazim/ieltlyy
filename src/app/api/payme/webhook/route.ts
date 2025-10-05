import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { paymeTransactions } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import PaymeClient from "@/lib/payme/payme-client";

const payme = new PaymeClient({
  merchantId: process.env.PAYME_MERCHANT_ID!,
  merchantKey: process.env.PAYME_MERCHANT_KEY!,
  isTestMode: process.env.PAYME_TEST_MODE === "true",
});

export async function POST(request: NextRequest) {
  try {
    // Verify authorization
    const authorization = request.headers.get("authorization");
    if (!authorization || !payme.verifyWebhookRequest(authorization)) {
      return NextResponse.json(
        {
          jsonrpc: "2.0",
          error: {
            code: -32504,
            message: "Unauthorized",
          },
        },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { method, params, id } = body;

    switch (method) {
      case "CheckPerformTransaction":
        return await handleCheckPerformTransaction(params, id);

      case "CreateTransaction":
        return await handleCreateTransaction(params, id);

      case "PerformTransaction":
        return await handlePerformTransaction(params, id);

      case "CancelTransaction":
        return await handleCancelTransaction(params, id);

      case "CheckTransaction":
        return await handleCheckTransaction(params, id);

      default:
        return NextResponse.json(
          payme.createResponse(id, null, {
            code: -32601,
            message: "Method not found",
          })
        );
    }
  } catch (error) {
    console.error("Payme webhook error:", error);
    return NextResponse.json(
      {
        jsonrpc: "2.0",
        error: {
          code: -32400,
          message: "Internal server error",
        },
      },
      { status: 500 }
    );
  }
}

async function handleCheckPerformTransaction(params: any, id: number) {
  const { amount, account } = params;
  const orderId = account.order_id;

  // Check if order exists and amount matches
  // You would check against your orders table here
  // For now, returning success
  return NextResponse.json(
    payme.createResponse(id, {
      allow: true,
    })
  );
}

async function handleCreateTransaction(params: any, id: number) {
  const { id: transactionId, time, amount, account } = params;
  const orderId = account.order_id;

  try {
    // Check if transaction already exists
    const existing = await db
      .select()
      .from(paymeTransactions)
      .where(eq(paymeTransactions.paymeTransactionId, transactionId))
      .limit(1);

    if (existing.length > 0) {
      const transaction = existing[0];
      if (transaction.state !== 1) {
        return NextResponse.json(
          payme.createResponse(id, null, PaymeClient.ERRORS.UNABLE_TO_PERFORM)
        );
      }

      return NextResponse.json(
        payme.createResponse(id, {
          create_time: transaction.createTime,
          transaction: transaction.id.toString(),
          state: transaction.state,
        })
      );
    }

    // Create new transaction
    const [newTransaction] = await db
      .insert(paymeTransactions)
      .values({
        paymeTransactionId: transactionId,
        orderId,
        amount,
        state: 1, // Created
        createTime: time,
        createdAt: new Date().toISOString(),
      })
      .returning();

    return NextResponse.json(
      payme.createResponse(id, {
        create_time: newTransaction.createTime,
        transaction: newTransaction.id.toString(),
        state: newTransaction.state,
      })
    );
  } catch (error) {
    console.error("Create transaction error:", error);
    return NextResponse.json(
      payme.createResponse(id, null, PaymeClient.ERRORS.UNABLE_TO_PERFORM)
    );
  }
}

async function handlePerformTransaction(params: any, id: number) {
  const { id: transactionId } = params;

  try {
    const [transaction] = await db
      .select()
      .from(paymeTransactions)
      .where(eq(paymeTransactions.paymeTransactionId, transactionId))
      .limit(1);

    if (!transaction) {
      return NextResponse.json(
        payme.createResponse(id, null, PaymeClient.ERRORS.TRANSACTION_NOT_FOUND)
      );
    }

    if (transaction.state !== 1) {
      if (transaction.state === 2) {
        return NextResponse.json(
          payme.createResponse(id, {
            transaction: transaction.id.toString(),
            perform_time: transaction.performTime,
            state: transaction.state,
          })
        );
      }
      return NextResponse.json(
        payme.createResponse(id, null, PaymeClient.ERRORS.UNABLE_TO_PERFORM)
      );
    }

    // Update transaction to performed
    const performTime = Date.now();
    const [updated] = await db
      .update(paymeTransactions)
      .set({
        state: 2, // Performed
        performTime,
      })
      .where(eq(paymeTransactions.id, transaction.id))
      .returning();

    // TODO: Grant user access to paid features here
    // You would update user's subscription, add credits, etc.

    return NextResponse.json(
      payme.createResponse(id, {
        transaction: updated.id.toString(),
        perform_time: performTime,
        state: updated.state,
      })
    );
  } catch (error) {
    console.error("Perform transaction error:", error);
    return NextResponse.json(
      payme.createResponse(id, null, PaymeClient.ERRORS.UNABLE_TO_PERFORM)
    );
  }
}

async function handleCancelTransaction(params: any, id: number) {
  const { id: transactionId, reason } = params;

  try {
    const [transaction] = await db
      .select()
      .from(paymeTransactions)
      .where(eq(paymeTransactions.paymeTransactionId, transactionId))
      .limit(1);

    if (!transaction) {
      return NextResponse.json(
        payme.createResponse(id, null, PaymeClient.ERRORS.TRANSACTION_NOT_FOUND)
      );
    }

    if (transaction.state === -1 || transaction.state === -2) {
      return NextResponse.json(
        payme.createResponse(id, {
          transaction: transaction.id.toString(),
          cancel_time: transaction.cancelTime,
          state: transaction.state,
        })
      );
    }

    const cancelTime = Date.now();
    const newState = transaction.state === 1 ? -1 : -2;

    const [updated] = await db
      .update(paymeTransactions)
      .set({
        state: newState,
        cancelTime,
        reason,
      })
      .where(eq(paymeTransactions.id, transaction.id))
      .returning();

    // TODO: Revoke access if transaction was performed
    if (transaction.state === 2) {
      // Revoke user's subscription or credits
    }

    return NextResponse.json(
      payme.createResponse(id, {
        transaction: updated.id.toString(),
        cancel_time: cancelTime,
        state: updated.state,
      })
    );
  } catch (error) {
    console.error("Cancel transaction error:", error);
    return NextResponse.json(
      payme.createResponse(id, null, PaymeClient.ERRORS.UNABLE_TO_PERFORM)
    );
  }
}

async function handleCheckTransaction(params: any, id: number) {
  const { id: transactionId } = params;

  try {
    const [transaction] = await db
      .select()
      .from(paymeTransactions)
      .where(eq(paymeTransactions.paymeTransactionId, transactionId))
      .limit(1);

    if (!transaction) {
      return NextResponse.json(
        payme.createResponse(id, null, PaymeClient.ERRORS.TRANSACTION_NOT_FOUND)
      );
    }

    return NextResponse.json(
      payme.createResponse(id, {
        create_time: transaction.createTime,
        perform_time: transaction.performTime,
        cancel_time: transaction.cancelTime,
        transaction: transaction.id.toString(),
        state: transaction.state,
        reason: transaction.reason,
      })
    );
  } catch (error) {
    console.error("Check transaction error:", error);
    return NextResponse.json(
      payme.createResponse(id, null, PaymeClient.ERRORS.TRANSACTION_NOT_FOUND)
    );
  }
}