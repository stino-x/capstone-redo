import './style.css';
import {
  movieBtn, openPopup, closePopup, Xbutton, centerModal, fillPopupwithinfo, filteringPopupdata,
} from './Modules/pop-up.js';
import {
  fetchMoviecards, movieList1, movieList2, movieList3,
} from './Modules/movie-cards.js';
import locationInfo from './Modules/geolocation.js';
import { postComment, loadComments } from './Modules/comments.js';
import { postReservation, loadReservations, updatingpopupHtml } from './Modules/reservations.js';
import { likeAnimation, updateAPIlikes } from './Modules/likes.js';

const FORM = document.querySelector('form');
const Button = FORM.querySelector('button').textContent;

// POP-UP.....................
const heightofContainer = document.querySelector('#article-container').clientHeight * 0.3;
const footerTop = () => {
  const footer = document.querySelector('footer');
  footer.style.top = `${heightofContainer}px`;
};
window.addEventListener('load', footerTop);
Xbutton.addEventListener('click', closePopup);
movieBtn.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    openPopup();
    centerModal();
    fillPopupwithinfo();
    if (!e.target.classList.includes('reservations-btn')) {
      loadComments();
    } else {
      updatingpopupHtml();
      loadReservations();
    }
  });
});
// MOVIE-CARDS...................................

const locationDetails = locationInfo();
movieList1.addEventListener('click', () => { fetchMoviecards(`https://api.tvmaze.com/schedule/web?date=${locationDetails.time}`); filteringPopupdata(); });
movieList2.addEventListener('click', () => { fetchMoviecards('https://api.tvmaze.com/schedule/full'); filteringPopupdata(); });
movieList3.addEventListener('click', () => { fetchMoviecards(`https://api.tvmaze.com/schedule/web?date=${locationDetails.time}&country=${locationDetails.countrycode}`); });
// COMMENTS AND RESERVATIONS ................

FORM.addEventListener('submit', (e) => {
  e.preventDefault();
  if (Button === 'Comment') {
    postComment();
    FORM.reset();
  } else {
    postReservation();
    FORM.reset();
  }
});

// LIKES.............................
window.addEventListener('DOMContentLoaded', (e) => {
  if (e.target.classList.includes('fa-heart')) {
    likeAnimation();
    updateAPIlikes();
  }
});
