import crypto from "crypto";

export interface PaymeConfig {
  merchantId: string;
  merchantKey: string;
  isTestMode?: boolean;
}

export interface PaymeTransaction {
  id: string;
  orderId: string;
  amount: number;
  state: number;
  createTime: number;
  performTime: number | null;
  cancelTime: number | null;
  reason: number | null;
}

export class PaymeClient {
  private config: PaymeConfig;
  private baseUrl: string;

  constructor(config: PaymeConfig) {
    this.config = config;
    this.baseUrl = config.isTestMode
      ? "https://checkout.test.paycom.uz"
      : "https://checkout.paycom.uz";
  }

  /**
   * Generate payment link for checkout
   */
  generatePaymentLink(params: {
    orderId: string;
    amount: number; // amount in UZS (tiyin - smallest unit)
    returnUrl?: string;
  }): string {
    const { orderId, amount, returnUrl } = params;

    // Encode order details in base64
    const orderData = Buffer.from(
      `m=${this.config.merchantId};ac.order_id=${orderId};a=${amount}`
    ).toString("base64");

    let url = `${this.baseUrl}/${orderData}`;

    if (returnUrl) {
      url += `?callback=${encodeURIComponent(returnUrl)}`;
    }

    return url;
  }

  /**
   * Verify webhook request from Payme
   */
  verifyWebhookRequest(authorization: string): boolean {
    try {
      const [type, credentials] = authorization.split(" ");

      if (type !== "Basic") {
        return false;
      }

      const decoded = Buffer.from(credentials, "base64").toString("utf-8");
      const [username, password] = decoded.split(":");

      // Payme uses merchant_id as username and key as password
      return (
        username === this.config.merchantId &&
        password === this.config.merchantKey
      );
    } catch (error) {
      return false;
    }
  }

  /**
   * Create response for Payme webhook
   */
  createResponse(id: number, result?: any, error?: any) {
    return {
      jsonrpc: "2.0",
      id,
      result,
      error,
    };
  }

  /**
   * Payme error codes
   */
  static readonly ERRORS = {
    TRANSACTION_NOT_FOUND: {
      code: -31001,
      message: {
        uz: "Tranzaksiya topilmadi",
        ru: "Транзакция не найдена",
        en: "Transaction not found",
      },
    },
    INVALID_AMOUNT: {
      code: -31001,
      message: {
        uz: "Noto'g'ri summa",
        ru: "Неверная сумма",
        en: "Invalid amount",
      },
    },
    ORDER_NOT_FOUND: {
      code: -31050,
      message: {
        uz: "Buyurtma topilmadi",
        ru: "Заказ не найден",
        en: "Order not found",
      },
    },
    UNABLE_TO_PERFORM: {
      code: -31008,
      message: {
        uz: "Tranzaksiyani amalga oshirib bo'lmadi",
        ru: "Невозможно выполнить операцию",
        en: "Unable to perform transaction",
      },
    },
    ALREADY_PERFORMED: {
      code: -31099,
      message: {
        uz: "Tranzaksiya allaqachon amalga oshirilgan",
        ru: "Транзакция уже выполнена",
        en: "Transaction already performed",
      },
    },
  };
}

export default PaymeClient;