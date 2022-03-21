import { Router } from 'express';
import { safe } from '../utils';
import { createUser, createPost, getFeed } from './routes';

const router = Router();

// signup route, creates a new user in the DB
router.post('/createuser', safe(createUser));
router.post('/createpost', safe(createPost));
router.get('/getfeed', safe(getFeed));

export default router;