// controllers/obatController.ts
import prisma from "../../prisma/client";

/**
 * Getting all obat
 */
export async function getObat() {
    try {
        const obat = await prisma.obat.findMany({ orderBy: { id: 'desc' } });
        return {
            success: true,
            message: "List Data Obat!",
            data: obat,
        };
    } catch (e: unknown) {
        console.error(`Error getting obat: ${e}`);
        return {
            success: false,
            message: "Terjadi kesalahan saat mendapatkan data obat",
        };
    }
}

/**
 * Creating a new obat
 */
export async function createObat(options: { 
    nama_obat: string; 
    jenis_obat: string; 
    harga_jual: number; 
    harga_beli: number; 
    deskripsi: string; 
    expired: string; // Menggunakan string ISO-8601
    kategori_id?: number 
}) {
    try {
        const { nama_obat, jenis_obat, harga_jual, harga_beli, deskripsi, expired, kategori_id } = options;

        // Validasi tanggal expired
        const expiredDate = new Date(expired);
        if (isNaN(expiredDate.getTime())) {
            return {
                success: false,
                message: "Format tanggal expired tidak valid",
            };
        }

        const obat = await prisma.obat.create({
            data: {
                nama_obat,
                jenis_obat,
                harga_jual,
                harga_beli,
                deskripsi,
                expired: expiredDate, // Pastikan formatnya benar
                kategoriId: kategori_id ?? undefined, // Opsional
            },
        });

        return {
            success: true,
            message: "Obat Created Successfully!",
            data: obat,
        };
    } catch (e: unknown) {
        console.error(`Error creating obat: ${e}`);
        return {
            success: false,
            message: "Terjadi kesalahan saat membuat data obat",
        };
    }
}

/**
 * Getting obat by ID
 */
export async function getObatById(id: string) {
    try {
        const obatId = parseInt(id);

        const obat = await prisma.obat.findUnique({
            where: { id: obatId },
        });

        if (!obat) {
            return {
                success: false,
                message: "Detail Data Obat Not Found!",
                data: null,
            };
        }

        return {
            success: true,
            message: `Detail Data Obat By ID : ${id}`,
            data: obat,
        };
    } catch (e: unknown) {
        console.error(`Error finding obat: ${e}`);
        return {
            success: false,
            message: "Terjadi kesalahan saat menemukan data obat",
        };
    }
}

/**
 * Updating an obat
 */
export async function updateObat(id: string, options: { 
    nama_obat?: string; 
    jenis_obat?: string; 
    harga_jual?: number; 
    harga_beli?: number; 
    deskripsi?: string; 
    expired?: string; // Menggunakan string ISO-8601
    kategori_id?: number 
}) {
    try {
        const obatId = parseInt(id);

        // Validasi tanggal expired
        let expiredDate: Date | undefined;
        if (options.expired) {
            expiredDate = new Date(options.expired);
            if (isNaN(expiredDate.getTime())) {
                return {
                    success: false,
                    message: "Format tanggal expired tidak valid",
                };
            }
        }

        const obat = await prisma.obat.update({
            where: { id: obatId },
            data: {
                ...(options.nama_obat ? { nama_obat: options.nama_obat } : {}),
                ...(options.jenis_obat ? { jenis_obat: options.jenis_obat } : {}),
                ...(options.harga_jual ? { harga_jual: options.harga_jual } : {}),
                ...(options.harga_beli ? { harga_beli: options.harga_beli } : {}),
                ...(options.deskripsi ? { deskripsi: options.deskripsi } : {}),
                ...(expiredDate ? { expired: expiredDate } : {}),
                ...(options.kategori_id ? { kategoriId: options.kategori_id } : {}),
            },
        });

        return {
            success: true,
            message: "Obat Updated Successfully!",
            data: obat,
        };
    } catch (e: unknown) {
        console.error(`Error updating obat: ${e}`);
        return {
            success: false,
            message: "Terjadi kesalahan saat memperbarui data obat",
        };
    }
}

/**
 * Deleting an obat
 */
export async function deleteObat(id: string) {
    try {
        const obatId = parseInt(id);

        await prisma.obat.delete({
            where: { id: obatId },
        });

        return {
            success: true,
            message: "Obat Deleted Successfully!",
        };
    } catch (e: unknown) {
        console.error(`Error deleting obat: ${e}`);
        return {
            success: false,
            message: "Terjadi kesalahan saat menghapus data obat",
        };
    }
}
