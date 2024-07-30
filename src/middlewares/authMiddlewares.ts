import { Elysia } from "elysia";
import jwt from 'elysia-jwt';

export const authMiddleware = (app: Elysia) => {
    return app.use(
        jwt({
            name: 'jwt',
            secret: Bun.env.JWT_SECRET!
        })
    ).use(async (set: { request: { headers: { get: (arg0: string) => any; }; }; status: number; }) => {

        const bearer = set.request.headers.get('Authorization');    

        if (!bearer) {
            set.status = 401;

            return {
                authorized: false
            }
        }

        const jwtPayload = await jwt.verify(bearer);

        if (!jwtPayload) {
            set.status = 401;

            return {
                authorized: false
            }
        }

        const id = jwtPayload.id;
        const user = await jwtPayload.model.findUnique({ where: { id } });

        if (!user) {
            set.status = 401;

            return {
                authorized: false
            }
        }

        return {

            authorized: true
        }
    });
}