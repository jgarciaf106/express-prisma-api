import { Router } from 'express';
import { safe } from '../utils';
import { createUser } from './routes';


const router = Router();

// signup route, creates a new user in the DB
//router.post('/user', safe(createUser));

export default router;