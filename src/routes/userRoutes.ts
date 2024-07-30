import { Elysia, t } from 'elysia';
import { getUsers, createUser, getUserById, updateUser, deleteUser } from '../controllers/UserController';

const UserRoutes = new Elysia({ prefix: '/users' })

    // Route get all users
    .get('/', () => getUsers())

    // Route create a user
    .post('/', ({ body }) => createUser(body as { username: string; nama: string; password: string; email: string; role: string; superAdminId?: number }), {
        body: t.Object({
            username: t.String({
                minLength: 3,
                maxLength: 255,
            }),
            nama: t.String({
                minLength: 3,
                maxLength: 255,
            }),
            password: t.String({
                minLength: 6,
                maxLength: 255,
            }),
            email: t.String({
                minLength: 5,
                maxLength: 255,
            }),
            role: t.String({
                minLength: 3,
                maxLength: 255,
                enum: ['apoteker', 'admin gudang'],
            }),
            superAdminId: t.Optional(t.Number()),
        })
    })

    // Route get user by ID
    .get('/:id', ({ params: { id } }) => getUserById(id))

    // Route update a user
    .patch('/:id', ({ params: { id }, body }) => updateUser(id, body as { username?: string; nama?: string; password?: string; email?: string; role?: string; superAdminId?: number }), {
        body: t.Object({
            username: t.Optional(t.String({
                minLength: 3,
                maxLength: 255,
            })),
            nama: t.Optional(t.String({
                minLength: 3,
                maxLength: 255,
            })),
            password: t.Optional(t.String({
                minLength: 6,
                maxLength: 255,
            })),
            email: t.Optional(t.String({
                minLength: 5,
                maxLength: 255,
            })),
            role: t.Optional(t.String({
                minLength: 3,
                maxLength: 255,
                enum: ['apoteker', 'admin gudang'],
            })),
            superAdminId: t.Optional(t.Number()),
        })
    })

    // Route delete a user
    .delete('/:id', ({ params: { id } }) => deleteUser(id));

export default UserRoutes;
