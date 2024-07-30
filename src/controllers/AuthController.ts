import prisma from "../../prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config";

interface LoginOptions {
    username: string;
    password: string;
}

export async function login({ username, password }: LoginOptions) {
    try {
        console.log(`Attempting login for username: ${username}`);

        let user = await prisma.user.findUnique({
            where: { username: username },
        });

        if (!user) {
            console.log(`No user found, checking super admin...`);
            const superAdmin = await prisma.superAdmin.findUnique({
                where: { username: username },
            });

            if (!superAdmin) {
                return {
                    success: false,
                    message: "User not found",
                    data: null,
                };
            }

            const isPasswordValid = await bcrypt.compare(password, superAdmin.password);
            console.log(`Password valid: ${isPasswordValid}`);

            if (!isPasswordValid) {
                return {
                    success: false,
                    message: "Invalid password",
                    data: null,
                };
            }

            const token = jwt.sign(
                { id: superAdmin.id, username: superAdmin.username, role: "superAdmin" },
                JWT_SECRET,
                { expiresIn: JWT_EXPIRES_IN }
            );

            return {
                success: true,
                message: "Login successful",
                data: { token },
            };
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log(`Password valid: ${isPasswordValid}`);

        if (!isPasswordValid) {
            return {
                success: false,
                message: "Invalid password",
                data: null,
            };
        }

        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        return {
            success: true,
            message: "Login successful",
            data: { token },
        };
    } catch (e: unknown) {
        console.error(`Error during login: ${e}`);
        return {
            success: false,
            message: "Error during login",
            data: null,
        };
    }
}
