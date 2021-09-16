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

  //get all movies.
  async getCharacters(attributes) {
    let finalarr = [];
    const characters = axios.get('https://swapi.dev/api/people/')
    .then(function (response) {
        // handle success
        console.log(response.data);

        finalarr = response.data.results;

        if(attributes.filter){
          finalarr =  new Movie().filterByProperty(finalarr, attributes.filter);
        }

        if(attributes.order){
          finalarr =  new Movie().sortByProperty(finalarr, attributes.sortby, attributes.order);
        }

        return finalarr;
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

    return characters;
  }

  #filterresponse
  filterByProperty(array, props){
    let filtered = [];

    for(let i = 0; i < array.length; i++){
      let obj = array[i];
        Object.keys(props).forEach(key => {
          if(obj[key] == props[key]){
            filtered.push(obj);
          }
        });
    } 

    return filtered;
  }

  #sortresponse
  sortByProperty(array, prop, order){
    if(order === 'asc'){
      array.sort(function (x, y) {
        return x[prop] - y[prop];
      });
    }

    if(order === 'desc'){
      array.sort(function (x, y) {
        return y[prop] - x[prop];
      });
    }

    return array;
  }


  //create a comment.
  async createComment(body) {
    await db
      .query("INSERT INTO comments (id, episode_id, comment) VALUES (uuid_generate_v4(), $1, $2)", [body.episode_id,body.comment])
      .catch(console.log);
    return;
  }
}

module.exports = Movie;