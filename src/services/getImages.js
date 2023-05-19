export async function getSearchImages(searchQuery, page = 1) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '34825153-ab3ec4a7983bb4a4e3513dccc';

  return await fetch(
    `${BASE_URL}?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(res => {
    if (res.length > 0) {
      return res.json();
    }
    return Promise.reject(new Error(`No images found by ${searchQuery}`));
  });
}
