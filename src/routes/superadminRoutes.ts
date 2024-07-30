//import elysia
import { Elysia, t } from 'elysia';

//import controller
import { getSuperAdmins, createSuperAdmin, getSuperAdminById, updateSuperAdmin, deleteSuperAdmin } from '../controllers/SuperAdminController';

const SuperAdminRoutes = new Elysia({ prefix: '/super-admin' })

    //route get all super admins
    .get('/', () => getSuperAdmins())

    //route create super admin
    .post('/', ({ body }) => createSuperAdmin(body as { username: string; password: string; noTelp: string; email: string }), {
        body: t.Object({
            username: t.String({
                minLength: 3,
                maxLength: 100,
            }),
            password: t.String({
                minLength: 6,
                maxLength: 100,
            }),
            email: t.String({
                minLength: 5,
                maxLength: 100,
            }),
        })
    })

    //route get super admin by id
    .get('/:id', ({ params: { id } }) => getSuperAdminById(id))

    //route update super admin
    .patch('/:id', ({ params: { id }, body }) => updateSuperAdmin(id, body as { username?: string; password?: string; noTelp?: string; email?: string }), {
        body: t.Object({
            username: t.Optional(t.String({
                minLength: 3,
                maxLength: 100,
            })),
            password: t.Optional(t.String({
                minLength: 6,
                maxLength: 100,
            })),
            email: t.Optional(t.String({
                minLength: 5,
                maxLength: 100,
            })),
        })
    })

    //route delete super admin
    .delete('/:id', ({ params: { id } }) => deleteSuperAdmin(id));

export default SuperAdminRoutes;
