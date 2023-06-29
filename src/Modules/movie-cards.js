export const fetchMoviecards = async (url) => {
  const response = await fetch(url);
  const data = await response.json();

  const movieCards = data.slice(0, 9);
  const movieCardsContainer = document.querySelector('#article-container');
  movieCardsContainer.innerHTML = '';
  movieCards.forEach((movieCard) => {
    const movieCardElement = document.createElement('article');
    movieCardElement.classList.add('movie-item');
    movieCardElement.innerHTML = `
    
        <img src="${movieCard._embedded.show.image.medium}" alt="img" />
        <h3>${movieCard._embedded.show.name}</h3>
        <div class="movie-title flex-row">
          <div class="likes flex-column">
            <i class="fa-solid fa-heart"></i>
            <span><i class="count-likes">0</i> likes</span>
          </div>
        </div>
        <button type="button" class="movie-btn">Comments</button>
        <button type="button" class="movie-btn reservations-btn">Reservations</button>
        <span class="hidden-class overview ">${movieCard._embedded.show.summary}</span>
        <span class="hidden-class pop-up-API-image ">${movieCard._embedded.show.image.original}</span>
        <span class="hidden-class language ">${movieCard._embedded.show.language}</span>
        <span class="hidden-class release-date ">${movieCard._embedded.show.premiered}</span><!-- add this as an if statement when you click future showings and add this  -->
        <span class="hidden-class type ">${movieCard._embedded.show.type}</span>
        <span class="hidden-class country-showing ">${movieCard._embedded.show.webChannel.country.name}</span><!-- add this as an if statement when you click future showings and globally showing and add this  -->
        <span class="hidden-class genre ">${movieCard._embedded.show.genres[0]} ${movieCard._embedded.show.genres[1]} ${movieCard._embedded.show.genres[2]}</span>
        <span class="hidden-class id ">${movieCard._embedded.show.id}</span>          
            `;
    movieCardsContainer.appendChild(movieCardElement);
  })
    .catch((error) => {
    // Handle any errors
      console.error(error);
    });
};
export const movieList1 = document.querySelector('#movie-list1');
export const movieList2 = document.querySelector('#movie-list2');
export const movieList3 = document.querySelector('#movie-list3');