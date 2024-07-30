import { Elysia, t } from 'elysia';

// Import controller
import { getObat, createObat, getObatById, updateObat, deleteObat } from '../controllers/ObatController';

// Define routes with Elysia
const Routes = new Elysia({ prefix: '/obat' })

    // Route to get all obat
    .get('/', async () => await getObat())

    // Route to create a new obat
    .post('/', async ({ body }) => await createObat(body as unknown as { 
        nama_obat: string; 
        jenis_obat: string; 
        harga_jual: number; 
        harga_beli: number; 
        deskripsi: string; 
        expired: string; 
        kategori_id?: number 
    }), {
        body: t.Object({
            nama_obat: t.String({
                minLength: 1,
                maxLength: 255,
            }),
            jenis_obat: t.String({
                minLength: 1,
                maxLength: 255,
            }),
            harga_jual: t.Number(),
            harga_beli: t.Number(),
            deskripsi: t.String({
                minLength: 1,
                maxLength: 1000,
            }),
            expired: t.String({ format: 'date' }),
            kategori_id: t.Optional(t.Number()),
        })
    })

    // Route to get obat by ID
    .get('/:id', async ({ params: { id } }) => await getObatById(id))

    // Route to update an obat
    .patch('/:id', async ({ params: { id }, body }) => await updateObat(id, body as { 
        nama_obat?: string; 
        jenis_obat?: string; 
        harga_jual?: number; 
        harga_beli?: number; 
        deskripsi?: string; 
        expired?: string; 
        kategori_id?: number 
    }), {
        body: t.Object({
            nama_obat: t.Optional(t.String({
                minLength: 1,
                maxLength: 255,
            })),
            jenis_obat: t.Optional(t.String({
                minLength: 1,
                maxLength: 255,
            })),
            harga_jual: t.Optional(t.Number()),
            harga_beli: t.Optional(t.Number()),
            deskripsi: t.Optional(t.String({
                minLength: 1,
                maxLength: 1000,
            })),
            expired: t.Optional(t.String({ format: 'date' })),
            kategori_id: t.Optional(t.Number()),
        })
    })

    // Route to delete an obat
    .delete('/:id', async ({ params: { id } }) => await deleteObat(id));

export default Routes;
