const axios = require('axios');
const API = id => `http://www.omdbapi.com/?apikey=1961811b&i=${id}`;

const movies = [];

const ids = [
  'tt0111161',
  'tt0068646',
  'tt0468569',
  'tt0071562',
  'tt7286456',
  'tt0167260',
  'tt0110912',
  'tt0108052',
  'tt0050083',
  'tt1375666',
];

Promise.all(
  ids.map(id => {
    return axios.get(API(id)).then(res => {
      const movie = res.data;

      return {
        title: movie.Title,
        year: Number(movie.Year),
        rated: movie.Rated,
        released: movie.Released,
        runtime: movie.Runtime,
        genre: movie.Genre,
        director: movie.Director,
        poster: movie.Poster,
        score: Number(movie.Metascore),
      };
    });
  }),
).then(movies => {
  console.log(movies);
});
