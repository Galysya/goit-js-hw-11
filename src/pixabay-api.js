import axios from 'axios';

// axios.get('/users')
//   .then(res => {
//     console.log(res.data);
//   });|
export class PixabayAPI {
  page;
  per_page = 20;
  q;

  fetchPhotoByQuery() {
    const BASE_URL = `https://pixabay.com/api/`;

    const pixabayOpt = {
      params: {
        key: '40711286-99c52945100cc4f3e9c27e3de',
        q: this.query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: this.page,
        per_page: this.per_page,
      },
    };
return axios.get(BASE_URL, pixabayOpt)
.then(response => response.data);
  }
}
