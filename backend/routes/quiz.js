import express from 'express';
import { createQuiz, findQuiz, findAllQuizzes } from '../controllers/quizController.js';

const router = express.Router();

router.post('/', createQuiz);

router.get('/quiz', findQuiz);

router.get('/all', findAllQuizzes);



export default router;