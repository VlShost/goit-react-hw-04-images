import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ url, tags, onClick }) {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        className={css.ImageGalleryItemImage}
        src={url}
        alt={tags}
        onClick={onClick}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  tags: PropTypes.string.isRequired,
};
