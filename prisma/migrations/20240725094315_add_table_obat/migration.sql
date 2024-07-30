-- CreateTable
CREATE TABLE "obat" (
    "id" SERIAL NOT NULL,
    "nama_obat" VARCHAR(255) NOT NULL,
    "jenis_obat" VARCHAR(255) NOT NULL,
    "harga_jual" DECIMAL(10,2) NOT NULL,
    "harga_beli" DECIMAL(10,2) NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "expired" DATE NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "kategori_id" INTEGER,

    CONSTRAINT "obat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kategori_obat" (
    "id" SERIAL NOT NULL,
    "nama" VARCHAR(255) NOT NULL,
    "deskripsi" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "kategori_obat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stok_obat" (
    "id" SERIAL NOT NULL,
    "obat_id" INTEGER NOT NULL,
    "satuan" TEXT,
    "jumlah_stok" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "stok_obat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "obat_masuk" (
    "id" SERIAL NOT NULL,
    "obat_id" INTEGER NOT NULL,
    "jumlah" INTEGER NOT NULL,
    "tanggal" DATE NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "obat_masuk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "obat_keluar" (
    "id" SERIAL NOT NULL,
    "obat_id" INTEGER NOT NULL,
    "jumlah" INTEGER NOT NULL,
    "tanggal" DATE NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "obat_keluar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_KategoriObatToObat" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "obat_masuk_obat_id_key" ON "obat_masuk"("obat_id");

-- CreateIndex
CREATE UNIQUE INDEX "obat_keluar_obat_id_key" ON "obat_keluar"("obat_id");

-- CreateIndex
CREATE UNIQUE INDEX "_KategoriObatToObat_AB_unique" ON "_KategoriObatToObat"("A", "B");

-- CreateIndex
CREATE INDEX "_KategoriObatToObat_B_index" ON "_KategoriObatToObat"("B");

-- AddForeignKey
ALTER TABLE "stok_obat" ADD CONSTRAINT "stok_obat_obat_id_fkey" FOREIGN KEY ("obat_id") REFERENCES "obat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "obat_masuk" ADD CONSTRAINT "obat_masuk_obat_id_fkey" FOREIGN KEY ("obat_id") REFERENCES "obat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "obat_keluar" ADD CONSTRAINT "obat_keluar_obat_id_fkey" FOREIGN KEY ("obat_id") REFERENCES "obat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KategoriObatToObat" ADD CONSTRAINT "_KategoriObatToObat_A_fkey" FOREIGN KEY ("A") REFERENCES "kategori_obat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KategoriObatToObat" ADD CONSTRAINT "_KategoriObatToObat_B_fkey" FOREIGN KEY ("B") REFERENCES "obat"("id") ON DELETE CASCADE ON UPDATE CASCADE;
