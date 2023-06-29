export const nameofperson = document.querySelector('#name-of-commenter');
export const comment = document.querySelector('#comment');
export const submit = document.querySelector('#comment-button');
export const id = document.querySelector('.pop-up').querySelector('.id').textContent;
export const commentList = document.querySelector('.pop-up').querySelector('.comments-display');
class Form {
  constructor(itemid, name, comment) {
    this.item_id = itemid;
    this.username = name;
    this.comment = comment;
  }
}
const submitComment = new Form(id, nameofperson.value, comment.value);
const url = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/49RqYGIcArZ2U5ymFK37/comments';

export const postComment = async () => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Additional headers if needed
    },
    body: JSON.stringify(submitComment),
    // Additional options if needed
  };
  const response = await fetch(url, options);
  if (response.status === 201) {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Months are zero-based, so add 1
    const day = currentDate.getDate();
    const todaysDate = `${year}:${month}:${day}`;
    const newListitem = `<li class="comment-li">${todaysDate} ${nameofperson.value}: ${comment.value}</li>`;
    commentList.appendChild(newListitem);
  } else {
    // Handle non-successful response
    throw new Error(`Error: ${response.status}`);
  }
};

// load previous comments
export const loadComments = async () => {
  const getrequest = fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/49RqYGIcArZ2U5ymFK37/comments/item_id=${id}`);
  const data = await getrequest.json();
  if (getrequest.ok) {
    let newListItems = '';
    data.forEach((comment) => {
      newListItems += `<li class="comment-li">${comment.creation_date} ${comment.username}: ${comment.comment}</li>`;
    });
    commentList.innerHTML = newListItems;
  }
};