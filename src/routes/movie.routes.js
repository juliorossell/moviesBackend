import { Router  } from "express";
import * as movieCtrl from '../controllers/movies.controller'

const router = Router();

router.get('/', movieCtrl.getMovies)

router.get('/:movieId', movieCtrl.getMovieById)

router.post('/', movieCtrl.createMovie)

router.put('/:movieId', movieCtrl.updateMovieById)

router.delete('/:movieId', movieCtrl.deleteMovieById)

export default router;