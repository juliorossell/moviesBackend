import { Router  } from "express";
import * as logCtrl from '../controllers/logs.controller'

const router = Router();

router.get('/', logCtrl.getLogs)

export default router;