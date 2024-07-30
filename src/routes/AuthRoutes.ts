// src/routes/AuthRoutes.ts
import { Elysia, t } from 'elysia';
import { login } from '../controllers/AuthController';

const AuthRoutes = new Elysia({ prefix: '/auth' })

    .post('/login', ({ body }) => login(body as { username: string; password: string }), {
        body: t.Object({
            username: t.String({
                minLength: 3,
                maxLength: 100,
            }),
            password: t.String({
                minLength: 6,
                maxLength: 100,
            }),
        })
    });

export default AuthRoutes;
