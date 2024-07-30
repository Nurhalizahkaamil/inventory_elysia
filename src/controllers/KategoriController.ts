// controllers/obatController.ts
import prisma from "../../prisma/client";

/**
 * Getting all kategori obat
 */
export async function getKategoriObat() {
    try {
        const kategori = await prisma.kategoriObat.findMany({
            orderBy: { id: 'desc' }
        });
        return {
            success: true,
            message: "Kategori Obat berhasil diambil!",
            data: kategori,
        };
    } catch (e: unknown) {
        console.error(`Error getting kategoriObat: ${e}`);
        return {
            success: false,
            message: "Terjadi kesalahan saat mendapatkan data kategori obat",
        };
    }
}

/**
 * Creating a new kategori obat
 */
export async function createKategoriObat(options: { 
    nama: string;  
    deskripsi: string; 
}) {
    try {
        const { nama, deskripsi } = options;
        const kategori = await prisma.kategoriObat.create({
            data: { 
                nama,
                deskripsi
            },
        });

        return {
            success: true,
            message: "Kategori Obat berhasil dibuat!",
            data: kategori,
        };
    } catch (e: unknown) {
        console.error(`Error creating kategoriObat: ${e}`);
        return {
            success: false,
            message: "Terjadi kesalahan saat membuat data kategori obat",
        };
    }
}

/**
 * Getting kategori obat by ID
 */
export async function getKategoriObatById(id: string) {
    try {
        const kategoriId = parseInt(id);

        const kategori = await prisma.kategoriObat.findUnique({
            where: { id: kategoriId },
        });

        if (!kategori) {
            return {
                success: false,
                message: "Detail Data Kategori Obat tidak ditemukan!",
                data: null,
            };
        }

        return {
            success: true,
            message: `Detail Data Kategori Obat dengan ID: ${id}`,
            data: kategori,
        };
    } catch (e: unknown) {
        console.error(`Error finding kategoriObat: ${e}`);
        return {
            success: false,
            message: "Terjadi kesalahan saat menemukan data kategori obat",
        };
    }
}

/**
 * Updating a kategori obat
 */
export async function updateKategoriObat(id: string, options: { 
    nama?: string; 
    deskripsi?: string; 
}) {
    try {
        const kategori = await prisma.kategoriObat.update({
            where: { id: parseInt(id) },
            data: {
                ...(options.nama ? { nama: options.nama } : {}),
                ...(options.deskripsi ? { deskripsi: options.deskripsi } : {}),
            },
        });

        return {
            success: true,
            message: "Kategori Obat berhasil diperbarui!",
            data: kategori,
        };
    } catch (e: unknown) {
        console.error(`Error updating kategoriObat: ${e}`);
        return {
            success: false,
            message: "Terjadi kesalahan saat memperbarui data kategori obat",
        };
    }
}

/**
 * Deleting a kategori obat
 */
export async function deleteKategoriObat(id: string) {
    try {
        const kategoriId = parseInt(id);

        await prisma.kategoriObat.delete({
            where: { id: kategoriId },
        });

        return {
            success: true,
            message: "Kategori Obat berhasil dihapus!",
        };
    } catch (e: unknown) {
        console.error(`Error deleting kategoriObat: ${e}`);
        return {
            success: false,
            message: "Terjadi kesalahan saat menghapus data kategori obat",
        };
    }
}
