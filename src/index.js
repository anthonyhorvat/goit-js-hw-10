import { fetchBreeds, fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';

const refs = {
  select: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  error: document.querySelector('.error'),
  loader: document.querySelector('.loader'),
};

refs.select.addEventListener('change', onClickSelect);

refs.loader.classList.add('hide');
refs.error.classList.add('hide');

fetchBreeds()
  .then(response => {
    return response
      .map(
        cat =>
          `<option class = "js-option" value="${cat.id}">${cat.name}</option>`
      )
      .join('');
  })
  .then(response => refs.select.insertAdjacentHTML('beforeend', response))
  .catch(error => console.log(error));

function onClickSelect(event) {
  const breedId = event.target.value;

  refs.select.classList.add('hide');
  refs.loader.classList.remove('hide');
  refs.catInfo.classList.add('hide');

  fetchCatByBreed(breedId)
    .then(response => {
      refs.select.classList.remove('hide');
      const data = response.data[0].breeds[0];

      return `<img class ="cat-image" src="${response.data[0].url}" alt ="" width="500">
    <h2>${data.name}</h2>
    <p>${data.description}</p>
    <p><b>Temperament:</b> ${data.temperament}</p>
    `;
    })
    .then(response => {
      refs.loader.classList.add('hide');
      refs.catInfo.classList.remove('hide');
      return (refs.catInfo.innerHTML = response);
    })
    .catch(error => {
      refs.select.classList.remove('hide');
      refs.loader.classList.add('hide');
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
}
