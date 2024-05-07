import express from 'express';
import { createComment, findQuizComments, findUserComments, findRandomComment } from '../controllers/commentController.js';


const router = express.Router();

router.post('/', createComment);

router.post('/quiz', findQuizComments);

router.get('/user', findUserComments);

router.get('/random', findRandomComment);



export default router;
