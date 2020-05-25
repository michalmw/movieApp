import {
  findMovies,
  getMovies,
} from './movies';

jest.mock('lowdb', () => {
  return () => ({
    get: jest.fn().mockReturnValue({
      value: () => ([])
    })
  })
})

jest.mock('lowdb/adapters/FileSync', () => {
  return function() {}
})

describe('movies', () => {
  it('getMovie should return all movies', () => {
    expect(getMovies()).toEqual([])
  });


  it('findMovie without Params should return randomOneMovie', () => {
    const movie = findMovies({});
    expect(movie.length).toEqual(1)
  });

  // Aby tutaj testy mialy sens musial bym zamockowac sobie jakies obiekty i je sprawdzac..
  // Nie moge uzywac pliku jsonowego, bo wystarczy ze cos tam dodacie lub usuniecie restem i testy moga nie przejsc ;P
  // Moge wam na rozmowie rekrutacyjnej pokazac mase testow napisanych :D
})