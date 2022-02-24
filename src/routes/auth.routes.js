import { Router  } from "express";

import * as authCtrl from '../controllers/auth.controller'
import { verifyToken } from "../middlewares/authJwt";

const router = Router();

router.post('/signin', authCtrl.signIn)

router.post('/signup', authCtrl.signUp)

router.delete('/logout', authCtrl.logout)

export default router;