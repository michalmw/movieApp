import { Request } from 'express';
import * as lowdb from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';
import * as path from 'path';

import { FilterMovie } from './types/filter-movie';
import { Movie } from './types/Movie';

const adapter = new FileSync(path.resolve(__dirname, 'movies.db.json'))
const db: any = lowdb(adapter)


export const getMovies = (): Movie[] => {
  return db.get('movies').value()
}

export const findMovies = (movieObj: FilterMovie): Movie[] => {

  const dbMovies = db.get('movies').value();
  const randomMovie = Math.floor(Math.random() * (dbMovies.length + 1));

  // Check if any param exist
  if (movieObj.duration && movieObj.genres) {
    return getMovieByGenres(dbMovies, movieObj.genres, movieObj.duration);
  }

  if (movieObj.genres) {
    return getMovieByGenres(dbMovies, movieObj.genres);
  }

  if (movieObj.duration) {
    const filteredMovie = getMovieByDuration(dbMovies, +movieObj.duration);
    return [filteredMovie[randomMovie]];
  }

  return [dbMovies[randomMovie]];
}

export const addMovie = (req: Request): Movie[] => {
  return db.get('movies')
    .push(req.body)
    .write()
}

const checkMovieDuration = (runtime: number, durationMin: number, durationMax: number) => {
  return runtime >= durationMin && runtime <= durationMax;
}

//Fajnie jak by czas byl na ustawienie jako private :D
const getMovieByDuration = (dbMovies: Movie[], duration: number) => {
  const durationMin = duration - 10;
  const durationMax = duration + 10;
  // A w readme jest napisane ze runtime to number.. ;P
  return dbMovies
    .filter(movie => checkMovieDuration(+movie.runtime, durationMin, durationMax));
}

const getMovieByGenres = (dbMovies: Movie[], genres: string[], duration = null) => {

  // Ogolnie najszybciej bylo by zrobic po duration
  // Potem po genres
  // I wywalic duplikaty.. ale na milionie rekordow 2x
  // filter po wszystkich wynikach nie jest najlepszym
  // rozwiazaniem, wiec lepiej policzyc mapa tutaj
  let durationMin:number;
  let durationMax:number;
  if (duration) {
    durationMin = duration - 10;
    durationMax = duration + 10;
  }

  return dbMovies
    .filter(movie => {

      if(duration && !checkMovieDuration(+movie.runtime, durationMin, durationMax)) {
        return false;
      }

      let movieGenres = new Set([...genres, ...movie.genres]);
      
      if (movie.genres && 
        (movie.genres.length + genres.length) > movieGenres.size) {

        movie['prioryty'] = movie.genres.length + genres.length - movieGenres.size;
        return true;
      }

      return false;

    })
    .sort((a, b) => {
        return a['prioryty'] - b['prioryty'];
    }).reverse();
}

