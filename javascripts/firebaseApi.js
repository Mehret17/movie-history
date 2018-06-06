let firebaseConfig = {};
let uid = '';

const setConfig = (fbcConfig) => {
  firebaseConfig = fbcConfig;
};

const setUID = (newUID) => {
  uid = newUID;
};

const saveMovieToWishList = (newMovie) => {
  newMovie.uid = uid;
  return new Promise ((resolve, reject) => {
    $.ajax({
      method: 'POST',
      url: `${firebaseConfig.databaseURL}/movies.json`,
      data: JSON.stringify(newMovie),
    })
      .done((uniqueArray) => {
        resolve(uniqueArray);
      })
      .fail((error) => {
        reject(error);
      });
  });
};

const getAllMovies = () => {
  return new Promise((resolve, reject) => {
    const allMoviesArray = [];
    $.ajax({
      method: 'GET',
      url: `${firebaseConfig.databaseURL}/movies.json?orderBy="uid"&equalTo="${uid}"`,
    })
      .done((allMoviesObj) => {
        if (allMoviesObj !== null) {
          Object.keys(allMoviesObj).forEach((fbKey) => {
            allMoviesObj[fbKey].id = fbKey;
            allMoviesArray.push(allMoviesObj[fbKey]);
          });
        }
        resolve(allMoviesArray);
      })
      .fail((error) => {
        reject(error);
      });
  });
};

const getWatchedMovies = () => {
  return new Promise((resolve, reject) => {
    const allMoviesArray = [];
    $.ajax({
      method: 'GET',
      url: `${firebaseConfig.databaseURL}/movies.json?orderBy="uid"&equalTo="${uid}"`,
    })
      .done((allMoviesObj) => {
        if (allMoviesObj !== null) {
          Object.keys(allMoviesObj).forEach((fbKey) => {
            if (allMoviesObj[fbKey].isWatched) {
              allMoviesObj[fbKey].id = fbKey;
              allMoviesArray.push(allMoviesObj[fbKey]);
            };
          });
        }
        resolve(allMoviesArray);
      })
      .fail((error) => {
        reject(error);
      });
  });
};

const getWishListMovies = () => {
  return new Promise((resolve, reject) => {
    const allMoviesArray = [];
    $.ajax({
      method: 'GET',
      url: `${firebaseConfig.databaseURL}/movies.json?orderBy="uid"&equalTo="${uid}"`,
    })
      .done((allMoviesObj) => {
        if (allMoviesObj !== null) {
          Object.keys(allMoviesObj).forEach((fbKey) => {
            if (!allMoviesObj[fbKey].isWatched) {
              allMoviesObj[fbKey].id = fbKey;
              allMoviesArray.push(allMoviesObj[fbKey]);
            };
          });
        }
        resolve(allMoviesArray);
      })
      .fail((error) => {
        reject(error);
      });
  });
};

const deleteMovieFromDb = (movieId) => {
  return new Promise ((resolve, reject) => {
    $.ajax({
      method: 'DELETE',
      url: `${firebaseConfig.databaseURL}/movies/${movieId}.json`,
    })
      .done(() => {
        resolve ();
      })
      .fail((error) => {
        reject(error);
      });
  });
};

const updateMovieToWatchedInDb = (updatedMovie, movieId) => {
  updatedMovie.uid = uid;
  return new Promise((resolve, reject) => {
    $.ajax({
      method: 'PUT',
      url: `${firebaseConfig.databaseURL}/movies/${movieId}.json`,
      data: JSON.stringify(updatedMovie),
    })
      .done((modifiedMovie) => {
        resolve(modifiedMovie);
      })
      .fail((error) => {
        reject(error);
      });
  });
};

module.exports = {
  saveMovieToWishList,
  setConfig,
  setUID,
  getAllMovies,
  getWatchedMovies,
  getWishListMovies,
  deleteMovieFromDb,
  updateMovieToWatchedInDb,
};
