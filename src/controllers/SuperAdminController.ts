import prisma from "../../prisma/client";
import bcrypt from "bcrypt";

/**
 * Getting all super admins
 */
export async function getSuperAdmins() {
    try {
        const superAdmins = await prisma.superAdmin.findMany({ orderBy: { id: 'desc' } });

        return {
            success: true,
            message: "List Data Super Admins!",
            data: superAdmins,
        };
    } catch (e: unknown) {
        console.error(`Error getting super admins: ${e}`);
        return {
            success: false,
            message: "Error getting super admins",
            data: null,
        };
    }
}

/**
 * Creating a super admin
 */
export async function createSuperAdmin(options: { username: string; password: string; email: string }) {
    try {
        const { username, password, email } = options;

        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

        const superAdmin = await prisma.superAdmin.create({
            data: {
                username,
                password: hashedPassword, // Save the hashed password
                email,
            },
        });

        return {
            success: true,
            message: "Super Admin Created Successfully!",
            data: superAdmin,
        };
    } catch (e: unknown) {
        console.error(`Error creating super admin: ${e}`);
        return {
            success: false,
            message: "Error creating super admin",
            data: null,
        };
    }
}

/**
 * Getting a super admin by ID
 */
export async function getSuperAdminById(id: string) {
    try {
        const superAdminId = parseInt(id);

        const superAdmin = await prisma.superAdmin.findUnique({
            where: { id: superAdminId },
        });

        if (!superAdmin) {
            return {
                success: false,
                message: "Detail Data Super Admin Not Found!",
                data: null,
            };
        }

        return {
            success: true,
            message: `Detail Data Super Admin By ID : ${id}`,
            data: superAdmin,
        };
    } catch (e: unknown) {
        console.error(`Error finding super admin: ${e}`);
        return {
            success: false,
            message: "Error finding super admin",
            data: null,
        };
    }
}

/**
 * Updating a super admin
 */
export async function updateSuperAdmin(id: string, options: { username?: string; password?: string; email?: string }) {
    try {
        const superAdminId = parseInt(id);

        const { username, password, email } = options;

        const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined; // Hash the new password if provided

        const superAdmin = await prisma.superAdmin.update({
            where: { id: superAdminId },
            data: {
                ...(username ? { username } : {}),
                ...(hashedPassword ? { password: hashedPassword } : {}),
                ...(email ? { email } : {}),
            },
        });

        return {
            success: true,
            message: "Super Admin Updated Successfully!",
            data: superAdmin,
        };
    } catch (e: unknown) {
        console.error(`Error updating super admin: ${e}`);
        return {
            success: false,
            message: "Error updating super admin",
            data: null,
        };
    }
}

/**
 * Deleting a super admin
 */
export async function deleteSuperAdmin(id: string) {
    try {
        const superAdminId = parseInt(id);

        await prisma.superAdmin.delete({
            where: { id: superAdminId },
        });

        return {
            success: true,
            message: "Super Admin Deleted Successfully!",
        };
    } catch (e: unknown) {
        console.error(`Error deleting super admin: ${e}`);
        return {
            success: false,
            message: "Error deleting super admin",
        };
    }
}
