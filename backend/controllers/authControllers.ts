import { type Request, type Response } from "express";
import { registerSchema } from "../schemas/registerSchema";
import prisma from "../prisma/db.config";

export const userRegister = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = registerSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        message: "Validation Failed",
        errors: result.error.message,
      });
      return;
    }

    const { name, email, password, username } = result.data;

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });

    if (existingUser) {
      res.status(409).json({ message: "Username or email already exists" });
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        username: username.toLowerCase(),
        password,
      },
    });

    res.status(201).json({ user });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};
