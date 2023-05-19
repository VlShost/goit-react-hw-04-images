import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from 'components/Modal/Modal';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';
import * as Scroll from 'react-scroll';
import { getSearchImages } from '../services/getImages';

const scroll = Scroll.animateScroll;

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [tags, setTags] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalImg, setModalImg] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (searchQuery.trim() === '') {
      return;
    }

    if (page === 1) {
      setStatus('pending');
      getSearchImages(searchQuery, page)
        .then(images => {
          setImages(images.hits);
          setStatus('resolved');
        })
        .catch(error => {
          setError(error);
          setStatus('rejected');
        });
      return;
    }

    if (page > 1) {
      setStatus('pending');
      getSearchImages(searchQuery, page)
        .then(images => {
          setImages(prevImages => [...prevImages, ...images.hits]);
          setStatus('resolved');
        })
        .catch(error => {
          setError(error);
          setStatus('rejected');
        });
    }

    scrollToBottom();
  }, [searchQuery, page]);

  const onSearchSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setPage(1);
    // setImages([]);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const getLargeImg = (largeImageURL, tags) => {
    toggleModal();
    setModalImg(largeImageURL);
    setTags(tags);
  };

  const scrollToBottom = () => {
    scroll.scrollMore(1200);
  };

  const loadMoreBtn = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={onSearchSubmit} className="Searchbar" />
      {status === 'idle' && (
        <div className="titleWrapper">
          <h1>What are we looking for?</h1>
        </div>
      )}
      {status === 'pending' && <Loader />}

      {status === 'rejected' &&
        images.length === 0 &&
        toast.error(error.message)}

      {status === 'resolved' && (
        <ImageGallery images={images} getLargeImg={getLargeImg} />
      )}
      {images.length !== 0 && <Button onClick={loadMoreBtn} />}
      {showModal === true && (
        <Modal toggleModal={toggleModal}>
          <img src={modalImg} alt={tags} />
        </Modal>
      )}
      <ToastContainer autoClose={1000} position="top-center" />
    </div>
  );
};

