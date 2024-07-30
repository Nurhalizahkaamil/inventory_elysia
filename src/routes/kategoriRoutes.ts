import { Elysia, t } from 'elysia';

// Import controller
import { getKategoriObat, createKategoriObat, getKategoriObatById, updateKategoriObat, deleteKategoriObat } from '../controllers/KategoriController';

// Define routes with Elysia
const Routes = new Elysia({ prefix: '/kategori-obat' })

    // Route to get all kategori obat
    .get('/', async () => await getKategoriObat())

    // Route to create a new kategori obat
    .post('/', async ({ body }) => await createKategoriObat(body as unknown as { 
        nama: string; 
        deskripsi: string; 
    }), {
        body: t.Object({
            nama: t.String({
                minLength: 1,
                maxLength: 255,
            }),
            deskripsi: t.String({
                minLength: 1,
                maxLength: 1000,
            })
        })
    })

    // Route to get kategori obat by ID
    .get('/:id', async ({ params: { id } }) => await getKategoriObatById(id))

    // Route to update a kategori obat
    .patch('/:id', async ({ params: { id }, body }) => await updateKategoriObat(id, body as { 
        nama?: string; 
        deskripsi?: string; 
    }), {
        body: t.Object({
            nama: t.Optional(t.String({
                minLength: 1,
                maxLength: 255,
            })),
            deskripsi: t.Optional(t.String({
                minLength: 1,
                maxLength: 1000,
            }))
        })
    })

    // Route to delete a kategori obat
    .delete('/:id', async ({ params: { id } }) => await deleteKategoriObat(id));

export default Routes;
