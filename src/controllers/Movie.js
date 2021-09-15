const db = require("../config/db");
const axios = require('axios').default;

class Movie{

 //get all movies.
  async getMovies() {
    const movies = axios.get('https://swapi.dev/api/films/')
    .then(function (response) {
        // handle success
        console.log(response.data);
        return response.data.results;
    })
    .catch(function (error) {
        // handle error
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            return error.response.data;
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            return error.request;
          } else {
            // Something happened in setting up the request that triggered an Error
           return error.message;
          }
    })

    return movies;
  }
}

module.exports = Movie;