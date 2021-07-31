import { Router } from 'express';
import auth from './authRoutes';
import users from './userRoutes';

const router = Router();
auth(router);
users(router);

export default router;