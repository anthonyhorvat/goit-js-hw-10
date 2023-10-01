import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_Ghx5M0SeqSHu6oBECVzDwgyBHH01hITsSx9WO9KG8zEbQjVp4TruQhkkJTpxO18z';

const fetchBreeds = function () {
  return fetch('https://api.thecatapi.com/v1/breeds').then(response => {
    if (!response.ok) {
      throw new Error(`Fetch error with ${resp.status}: ${resp.statusText}`);
    }
    return response.json();
  });
};

const fetchCatByBreed = function (breedId) {
  return axios.get(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&has_breeds=1`
  );
};

export { fetchBreeds, fetchCatByBreed };
