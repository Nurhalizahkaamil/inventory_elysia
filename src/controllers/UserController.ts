import prisma from "../../prisma/client";
import bcrypt from "bcrypt";

/**
 * Getting all users
 */
export async function getUsers() {
    try {
        const users = await prisma.user.findMany({ orderBy: { id: 'desc' } });

        return {
            success: true,
            message: "List Data Users!",
            data: users,
        };
    } catch (e: unknown) {
        console.error(`Error getting users: ${e}`);
        return {
            success: false,
            message: "Error getting users",
            data: null,
        };
    }
}

/**
 * Creating a user
 */
export async function createUser(options: { username: string; nama: string; password: string; email: string; role: string; superAdminId?: number }) {
    try {
        const { username, nama, password, email, role, superAdminId } = options;

        // Ensure role is either 'apoteker' or 'admin gudang'
        if (!['apoteker', 'admin gudang'].includes(role)) {
            return {
                success: false,
                message: "Invalid role",
                data: null,
            };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                username,
                nama,
                password: hashedPassword,
                email,
                role,
                superAdminId,
            },
        });

        return {
            success: true,
            message: "User Created Successfully!",
            data: user,
        };
    } catch (e: unknown) {
        console.error(`Error creating user: ${e}`);
        return {
            success: false,
            message: "Error creating user",
            data: null,
        };
    }
}

/**
 * Getting a user by ID
 */
export async function getUserById(id: string) {
    try {
        const userId = parseInt(id);

        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return {
                success: false,
                message: "Detail Data User Not Found!",
                data: null,
            };
        }

        return {
            success: true,
            message: `Detail Data User By ID : ${id}`,
            data: user,
        };
    } catch (e: unknown) {
        console.error(`Error finding user: ${e}`);
        return {
            success: false,
            message: "Error finding user",
            data: null,
        };
    }
}

/**
 * Updating a user
 */
export async function updateUser(id: string, options: { username?: string; nama?: string; password?: string; email?: string; role?: string; superAdminId?: number }) {
    try {
        const userId = parseInt(id);

        const { username, nama, password, email, role, superAdminId } = options;

        // Ensure role is either 'apoteker' or 'admin gudang'
        if (role && !['apoteker', 'admin gudang'].includes(role)) {
            return {
                success: false,
                message: "Invalid role",
                data: null,
            };
        }

        const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

        const user = await prisma.user.update({
            where: { id: userId },
            data: {
                ...(username ? { username } : {}),
                ...(nama ? { nama } : {}),
                ...(hashedPassword ? { password: hashedPassword } : {}),
                ...(email ? { email } : {}),
                ...(role ? { role } : {}),
                ...(superAdminId ? { superAdminId } : {}),
            },
        });

        return {
            success: true,
            message: "User Updated Successfully!",
            data: user,
        };
    } catch (e: unknown) {
        console.error(`Error updating user: ${e}`);
        return {
            success: false,
            message: "Error updating user",
            data: null,
        };
    }
}

/**
 * Deleting a user
 */
export async function deleteUser(id: string) {
    try {
        const userId = parseInt(id);

        await prisma.user.delete({
            where: { id: userId },
        });

        return {
            success: true,
            message: "User Deleted Successfully!",
        };
    } catch (e: unknown) {
        console.error(`Error deleting user: ${e}`);
        return {
            success: false,
            message: "Error deleting user",
        };
    }
}
