import { NextRequest } from "next/server";
import { verifyToken, JwtPayload } from "@/lib/jwt";

export function getBearerToken(req: NextRequest) {
  const auth = req.headers.get("authorization") || req.headers.get("Authorization");
  if (!auth) return null;
  const parts = auth.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") return null;
  return parts[1];
}

export function requireAuth(req: NextRequest): JwtPayload | null {
  const token = getBearerToken(req);
  if (!token) return null;
  const payload = verifyToken(token);
  return payload; // or null
}

export function requireAdmin(req: NextRequest): JwtPayload | null {
  const payload = requireAuth(req);
  if (!payload || payload.role !== "admin") return null;
  return payload;
}