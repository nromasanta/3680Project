import express from 'express';
import { createQuiz, findQuiz, findAllQuizzes, publishScore, getLeaderboard, updateViewcount } from '../controllers/quizController.js';

const router = express.Router();

router.post('/', createQuiz);

router.post('/publishScore/:id', publishScore);

router.post('/viewcount/:id', updateViewcount);

router.get('/quiz/:id', findQuiz);

router.get('/all', findAllQuizzes);

router.get('/leaderboard/:id', getLeaderboard);



export default router;