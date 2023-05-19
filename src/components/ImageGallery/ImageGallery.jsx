import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export default function ImageGallery({ getLargeImg, images }) {
  return (
    <>
      <ul className={css.ImageGallery}>
        {images.map(({ id, tags, webformatURL, largeImageURL }) => (
          <ImageGalleryItem
            key={id}
            url={webformatURL}
            tags={tags}
            onClick={() => getLargeImg(largeImageURL, tags)}
          />
        ))}
      </ul>
    </>
  );
}

ImageGallery.propTypes = {
  getLargeImg: PropTypes.func.isRequired,
  images: PropTypes.array.isRequired,
};
