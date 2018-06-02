const tmdb = require('./tmdb');
const firebaseApi = require('./firebaseApi');
const dom = require('./dom');
console.log('tmbd:', tmdb);

const myLinks = () => {
  $(document).click((e) => {
    if (e.target.id === 'authenticate') {
      $('#myMovies').addClass('hide');
      $('#search').addClass('hide');
      $('#authScreen').removeClass('hide');
    } else if (e.target.id === 'mine') {
      $('#myMovies').removeClass('hide');
      $('#search').addClass('hide');
      $('#authScreen').addClass('hide');
      getAllMoviesEvent();
    } else if (e.target.id === 'navSearch') {
      $('#myMovies').addClass('hide');
      $('#search').removeClass('hide');
      $('#authScreen').addClass('hide');
    };
  });
};

const pressEnter = () => {
  $(document).keypress((e) => {
    if (e.key === 'Enter') {
      const searchWords = $('#searchBar').val().replace(' ', '%20');
      tmdb.showResults(searchWords);
    }
  });
};

const saveMovieToWishListEvent = () => {
  $(document).on('click', '.addMovieToWishList', (e) => {
    const movieToAddCard = $(e.target).closest('.movie');
    const movieToAdd = {
      title: movieToAddCard.find('.movie-title').text(),
      overview: movieToAddCard.find('.movie-overview').text(),
      'poster_path': movieToAddCard.find('img').data('poster'),
      rating: 0,
      isWatched: false,
    };
    firebaseApi.saveMovieToWishList(movieToAdd)
      .then(() => {
        movieToAddCard.remove(); // removing it from the dom
      })
      .catch((error) => {
        console.error('error in saving movie', error);
      });
  });
};

const getAllMoviesEvent = () => {
  firebaseApi.getAllMovies()
    .then((moviesArray) => {
      moviesArray.forEach((movie) => {
        dom.domString(moviesArray, tmdb.getImageConfig(), 'savedMovies', true);

      });
    })
    .catch((error) => {
      console.error('error in get all Movies', error);
    });
};

const getWatchedMoviesEvent = () => {
  firebaseApi.getWatchedMovies()
    .then((moviesArray) => {
      moviesArray.forEach((movie) => {
        dom.domString(moviesArray, tmdb.getImageConfig(), 'savedMovies', true);

      });
    })
    .catch((error) => {
      console.error('error in get Watched Movies', error);
    });
};
const getWishlistMoviesEvent = () => {
  firebaseApi.getWishListMovies()
    .then((moviesArray) => {
      moviesArray.forEach((movie) => {
        dom.domString(moviesArray, tmdb.getImageConfig(), 'savedMovies', true);

      });
    })
    .catch((error) => {
      console.error('error in get all Movies', error);
    });
};

const deleteMovieFromFirebase = () => {
  $(document).on('click', '.deleteMovieFromCollectionEvent', (e) => {
    const movieToDeleteId = $(e.target).closest('.movie').data('firebaseId');
    firebaseApi.deleteMovieFromDb(movieToDeleteId)
      .then(() => {
        getAllMoviesEvent();
      })
      .catch((error) => {
        console.error('error from delete movie:', error);
      });
  });
};

const updateMovieEvent = () => {
  $(document).on('click', '.updateMovieToWatched', (e) => {
    const movieToUpdatedId = $(e.target).closest('.movie').data('firebaseId');
    const movieToUpdatedCard = $(e.target).closest('.movie');
    const updatedMovie = {
      title: movieToUpdatedCard.find('.movie-title').text(),
      overview: movieToUpdatedCard.find('.movie-overview').text(),
      'poster_path': movieToUpdatedCard.find('img').data('poster'),
      rating: 0,
      isWatched: true,
    };
    firebaseApi.updateMovieToWatchedInDb(updatedMovie, movieToUpdatedId)
      .then(() => {
        getAllMoviesEvent();
      })
      .catch((error) => {
        console.error('error in update movie', error);
      });
  });
};

const filterEvents = () => {
  $('#filterButtons').on('click', (e) => {
    const classList = e.target.classList;
    if (classList.contains('wishList')) {
      // show only isWatched: false
      getWishlistMoviesEvent();
    } else if (classList.contains('watched')) {
      // show only isWatched: true
      getWatchedMoviesEvent();
    } else {
      // give me everything
      getAllMoviesEvent();
    };
  });
};

const initializer = () => {
  myLinks();
  pressEnter();
  saveMovieToWishListEvent();
  deleteMovieFromFirebase();
  updateMovieEvent();
  filterEvents();
};

module.exports = {
  initializer,
};
