import { Router } from 'express';

import {
  handleAddMovies,
  handleFindMovies,
  handleGetMovies,
} from './handlers';

export const moviesRouter = (): Router => {
  const router = Router()

  router
    .get('/', handleGetMovies)
    .get('/find', handleFindMovies)
    .post('/', handleAddMovies)

  return router
}