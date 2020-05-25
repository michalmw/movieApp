export class Movie {
  constructor(
    public id: number,
    public title: string,
    public year: number,
    public runtime: number,
    public director: string,
    public actors: string,
    public plot: string,
    public posterUrl: string,
    public genres: string[]
  ) {}
}
