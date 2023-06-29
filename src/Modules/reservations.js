import { fillPopupwithinfo } from './pop-up.js';
import {
  submit, id, nameofperson, commentList,
} from './comments.js';

const movieCardsContainer = document.querySelector('.pop-up-container');
const startdate = movieCardsContainer.querySelector('#date1');
const enddate = movieCardsContainer.querySelector('#date2');
export const updatingpopupHtml = () => {
  fillPopupwithinfo();
  const form = movieCardsContainer.querySelector('form');
  const textarea = form.querySelector('textarea');
  const [...remainingElements] = form;
  textarea.remove();
  const regex = /\d{4}-\d{2}-\d{2}/;
  const patternAttribute = `pattern="${regex}"`;
  const newHTML = `<input type="datetime" name="" id="date1" placeholder="start date" maxlength="25" ${patternAttribute} required>`;
  const newHTML1 = `<input type="datetime" name="" id="date2" placeholder="end date " maxlength="25"  ${patternAttribute} required>`;
  submit.textContent = 'Reserve';
  form.insertBefore(newHTML, remainingElements[1]);
  form.insertBefore(newHTML1, newHTML.nextSibling);
};
class Reservation {
  constructor(item1, Jane, date1, date2) {
    this.item_id = item1;
    this.username = Jane;
    this.date_start = date1;
    this.date_end = date2;
  }
}
const reServation = new Reservation(id, nameofperson.value, startdate.value, enddate.value);
const url = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/49RqYGIcArZ2U5ymFK37/reservations/';
export const postReservation = async () => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Additional headers if needed
    },
    body: JSON.stringify(reServation),
    // Additional options if needed
  };
  const response = await fetch(url, options);
  if (response.status === 201) {
    const begindate = reServation.date_start;
    const enddate = reServation.date_end;
    const name = reServation.username;
    const newListitem = `<li class="comment-li">${begindate}-${enddate} by${name}</li>`;
    commentList.appendChild(newListitem);
  } else {
    // Handle non-successful response
    throw new Error(`Error: ${response.status}`);
  }
};

// LOAD PREVIOUS RESERVATIONS .............
export const loadReservations = () => {
  const getrequest = fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/49RqYGIcArZ2U5ymFK37/reservations/item_id=${id}`);
  getrequest.then((response) => response.json()).then((data) => {
    if (getrequest.ok) {
      let newListitem = '';
      data.forEach((reservation) => {
        const begindate = reservation.date_start;
        const enddate = reservation.date_end;
        const name = reservation.username;
        newListitem = `<li class="comment-li">${begindate}-${enddate} by${name}</li>`;
      });
      commentList.innerHTML = newListitem;
    }
  });
};