const tmdb = require('./tmdb');
const firebaseApi = require('./firebaseApi');
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

const initializer = () => {
  myLinks();
  pressEnter();
  saveMovieToWishListEvent();
};

module.exports = {
  initializer,
};
