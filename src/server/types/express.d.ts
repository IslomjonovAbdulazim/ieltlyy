import "express-serve-static-core";

declare module "express-serve-static-core" {
  interface Request {
    user?: { userId: string; role: "student" | "admin" };
  }
}
export {};