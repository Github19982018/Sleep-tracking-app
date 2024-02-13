import {Router} from  'express';
const  router = Router();
import { getUserdata, addUserdata, updateUserdata, deleteUserdata } from './userDataController.js';
import {register, login} from './userAuthController.js'
import { verifyToken } from './middleware.js';

router.use('/users', verifyToken);

router.get('/users',getUserdata);
router.post('/users/',addUserdata);
router.put("/users/:id", updateUserdata)
router.delete("/users/:id", deleteUserdata)
router.post('/login', login);
router.post('/register', register);


export default router;