import express from 'express';
import { getAllUsers, getSingleUser, createUser, loginUser } from '../controllers/userController.js';


const router = express.Router()

router.post('/', createUser);

router.post('/login', loginUser);

//http://localhost:4000/api/users/
router.get('/', getAllUsers)

//http://localhost:4000/api/users/[replace_with_id]
router.get('/:id', getSingleUser)



export default router;