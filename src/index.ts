//import elysia
import { Elysia } from 'elysia';

//import routes
import Routes from './routes';
import SuperAdminRoutes from './routes/superadminRoutes';
import UserRoutes from './routes/userRoutes';
import AuthRoutes from './routes/AuthRoutes';
import ObatRoutes from './routes/obatRoutes';
import { swagger } from '@elysiajs/swagger'

//initiate elysia
const app = new Elysia();
app.use(SuperAdminRoutes);
app.use(UserRoutes);
app.use(AuthRoutes);
app.use(ObatRoutes);
app.use(swagger())


//route home
app.get('/', () => 'Hello Elysia!');

//add routes
app.group('/api', (app) => app.use(Routes))

//start server on port 3000
app.listen(3000);
 
console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);