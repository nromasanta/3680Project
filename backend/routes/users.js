import express from 'express';
import { getAllUsers, getSingleUser } from '../controllers/userController.js';


const router = express.Router()

//http://localhost:4000/api/users/
router.get('/', getAllUsers)

//http://localhost:4000/api/users/[replace_with_id]
router.get('/:id', getSingleUser)



export default router;