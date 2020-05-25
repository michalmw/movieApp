import { Validator } from 'class-validator';
import {
  Request,
  Response,
} from 'express';
import { deserialize } from 'json-typescript-mapper';

import {
  addMovie,
  findMovies,
  getMovies,
} from './movies';
import { CreateMovieRequest } from './types/add-movie';

export const handleGetMovies = (request: Request, response: Response): Response => {
  return response.json(getMovies())
}

export const handleFindMovies = (request: Request, response: Response): Response => {
  return response.json(findMovies(request.body))
}

export const handleAddMovies = (request: Request, response: Response): Response => {
  // Moze jakis globalny middleware.. 

  let validator = new Validator();

  let input = deserialize(CreateMovieRequest, request.body);

  let errors = validator.validateSync(input);
  if (errors.length > 0) {
    return response.status(400).json(errors);
  } else {
    request.body = input;
    return response.json(addMovie(request))
  }

  
}