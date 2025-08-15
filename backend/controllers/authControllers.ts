import { type Request, type Response } from "express";
import { registerSchema } from "../schemas/registerSchema";
import prisma from "../prisma/db.config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
        OR: [{ username: username.toLowerCase() }, { email }],
      },
    });

    if (existingUser) {
      res
        .status(409)
        .json({ message: "A user wil this Username or Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        username: username.toLowerCase(),
        password: hashedPassword,
      },
    });

    res.status(201).json({ user });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

export const userLogin = async (req: Request, res: Response) => {
  try {
    const { identifier, password } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: identifier },
          { username: { equals: identifier, mode: "insensitive" } },
        ],
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      token,
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};
