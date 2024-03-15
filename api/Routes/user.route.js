import express from "express";
import{authenticateWithGoogle, createUser,signIn,update, getAllUsers} from '../Controllers/user.controller.js'

const router = express.Router();

router.post("/",createUser);
router.post("/signIn",signIn);
router.post("/google",authenticateWithGoogle);
router.put("/updateImage/:id",update);
router.get("/allUsers",getAllUsers);

export default router