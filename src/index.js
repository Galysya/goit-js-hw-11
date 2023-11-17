import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { PixabayAPI } from './pixabay-api';
import  SimpleLightbox  from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";

const refs = {
  formElem: document.querySelector('#search-form'),
  galleryListEl: document.querySelector('.gallery'),
  btnEl: document.querySelector('.load-more'),
};
// refs.btnEl.disabled = true;
refs.formElem.addEventListener('submit', onFormElemSubmit);
refs.btnEl.addEventListener('click', onBtnElClick);

let gallery = new SimpleLightbox('.gallery a');
const pixabayAPI = new PixabayAPI();


function onBtnElClick() {
  pixabayAPI.page += 1;
  pixabayAPI.fetchPhotoByQuery().then((data) => {
    renderMarkup(data.hits);

    const { height: cardHeight } = document.querySelector(".gallery")

  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: 500,
  behavior: "smooth",
});

    const totalPage = Math.ceil(data.totalHits / pixabayAPI.per_page);
    if (totalPage === pixabayAPI.page) {
      refs.btnEl.classList.add('is-hidden');
    }
    console.log("We're sorry, but you've reached the end of search results.");
  });
}

function onFormElemSubmit(event) {
  event.preventDefault();
  const { target: formElem } = event;
  pixabayAPI.query = formElem.elements.searchQuery.value;
  pixabayAPI.page = 1;
  pixabayAPI.fetchPhotoByQuery().then(res => {
    console.log(res); renderMarkup(res.hits);

    if (res.total === 0) {
      refs.galleryListEl.innerHTML = '';
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    return;
  });
}

function templatePhoto({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `<div class="photo-card container" >
  <a href="${largeImageURL}"> <img 
  src="${webformatURL}" 
  alt="${tags}" 
  loading="lazy"/> </a>

  <div class="info container">
    <p class="info-item ">
      <b>likes</b>
      ${likes}
    </p>
    <p class="info-item">
      <b>views</b>
      ${views}
    </p>
    <p class="info-item">
      <b>comments</b>
      ${comments}
    </p>
    <p class="info-item">
      <b>downloads</b>
      ${downloads}
    </p>
  </div>
</div>`;
}

function templatePhotos(photo) {
  console.log(photo);
  const template = photo.map(templatePhoto).join('');
  return template;
}
function renderMarkup(photo) {
  const markupInfo = templatePhotos(photo);
  refs.galleryListEl.innerHTML = markupInfo;
  gallery.refresh();

}




