export const movieBtn = document.querySelectorAll('.movie-btn');
const movieCardsContainer = document.querySelector('.pop-up-container');
export const openPopup = () => {
  movieCardsContainer.style.display = 'block';
  // Remove scroll from the window
  document.body.style.overflow = 'hidden';
  document.querySelector('.overlay').style.display = 'block';
};
export const closePopup = () => {
  movieCardsContainer.style.display = 'none';
  document.body.style.overflow = 'auto';
  document.querySelector('.overlay').style.display = 'none';
};
export const Xbutton = movieCardsContainer.querySelector('#cancel-icon');
Xbutton.addEventListener('click', closePopup);
// CENTERING MY POPUP...........................................

function pxToVh(px) {
  return (px / window.innerHeight) * 100;
}

function pxToVw(px) {
  return (px / window.innerWidth) * 100;
}
export function centerModal() {
//   const modal = document.getElementById('modal');
  const modalContent = document.querySelector('.pop-up-container');

  const modalWidth = pxToVw(modalContent.offsetWidth);
  const modalHeight = pxToVh(modalContent.offsetHeight);

  const leftPosition = (100 - modalWidth) / 2;
  const topPosition = (100 - modalHeight) / 2;

  modalContent.style.left = `${leftPosition}vw`;
  modalContent.style.top = `${topPosition}vh`;
  modalContent.style.bottom = `${topPosition}vh`;
  modalContent.style.right = `${leftPosition}vw`;
}

// Call centerModal() whenever the window is resized
window.addEventListener('resize', centerModal);

// POP-UP INFO..........................................
export const getPopupinfo = (e) => {
  const article = e.target.closest('article');
  const movieTitle = article.querySelector('h3').textContent;
  const movieImage = article.querySelector('.pop-up-API-image').textContent;
  const overview = article.querySelector('.overview').textContent;
  const language = article.querySelector('.language').textContent;
  const releaseDate = article.querySelector('.release-date').textContent;
  const type = article.querySelector('.type').textContent;
  const countryshowing = article.querySelector('.country-showing').textContent;
  const genre = article.querySelector('.genre').textContent;
  const id = article.querySelector('.id').textContent;
  const genreArray = genre.split(',');
  return {
    movieTitle,
    movieImage,
    overview,
    language,
    releaseDate,
    type,
    countryshowing,
    genreArray,
    id,
  };
};

export const fillPopupwithinfo = (e) => {
  if (e.target.className === 'movie-btn') {
    const hiddenPopupinfo = getPopupinfo();
    movieCardsContainer.innerHTML = `<div class="pop-up">
            
  <i class="fa-solid fa-xmark" id="cancel-icon"></i>

<div class="pop-up-content">
  <div class="movie-img">
  </div>
  <div class="movie-info">
      <h3 id="movie-name">${hiddenPopupinfo.movieTitle}</h3>
      <div class="movie-details">
      <span class="desc">OVERVIEW</span>
      <div class="movie-info1 ">${hiddenPopupinfo.overview}</div>
      <span class="desc">LANGUAGE</span>
      <div class="movie-info2"> ${hiddenPopupinfo.language}</div>
      <span class="desc">MOVIE TYPE</span>
      <div class="movie-info3">${hiddenPopupinfo.type}</div>
      <span class="desc">OVERVIEW</span>
      <div class="movie-info4">${hiddenPopupinfo.genreArray[0]},${hiddenPopupinfo.genreArray[1]},${hiddenPopupinfo.genreArray[2]}</div>
      </div>
  </div>
  <div class="movie-comment-section">
  <span class="hidden-class id ">${hiddenPopupinfo.id}</span>
      <h4>Comments(comment-count)</h4>
      <ul class="comments-display">
      <li class="comment-li">Date Name: comment...</li>
      <li class="comment-li">Date Name: comment...</li>
      <li class="comment-li">Date Name: comment...</li>
      <li class="comment-li">Date Name: comment...</li>
      </ul>
    <h5>Add a Comment</h5>
    <div class="input-area">
    <form action="">
      <input type="text" name="" id="name-of-commenter" placeholder="name of commenter" maxlength="25">
    
    <textarea name="" id="comment" placeholder="insights" cols="30" rows="10"  maxlength="100"></textarea>
    <button type="submit" id="comment-button">Comment</button>
    </form>
    </div>
  </div>
</div>
</div>`;
  }
};
// Initial centering of the modal
movieBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
    openPopup();
    centerModal();
    fillPopupwithinfo();
  });
});

export const filteringPopupdata = () => {
  const hiddenPopupinfo = getPopupinfo();
  const details = movieCardsContainer.querySelector('.movie-details');
  const countrydetail = `<span class="desc">OVERVIEW</span>
  <div class="movie-info1 ">${hiddenPopupinfo.countryshowing}</div>`;
  details.insertAdjacentHTML('beforeend', countrydetail);
};