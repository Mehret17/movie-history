let firebaseConfig = {};

const setConfig = (fbcConfig) => {
  firebaseConfig = fbcConfig;
};

const saveMovieToWishList = (newMovie) => {
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
      url: `${firebaseConfig.databaseURL}/movies.json`,
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
  getAllMovies,
  deleteMovieFromDb,
  updateMovieToWatchedInDb,
};
