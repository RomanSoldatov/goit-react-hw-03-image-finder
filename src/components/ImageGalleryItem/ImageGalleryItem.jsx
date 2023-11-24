import { ListItem, Picture } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ item, onImageClick }) => {
  const { largeImageURL, tags, webformatURL } = item;

  return (
    <ListItem
      onClick={e => {
        e.preventDefault();
        onImageClick({ largeImageURL, tags });
      }}
    >
      <div>
        <Picture src={webformatURL} alt={tags} loading="lazy" />
      </div>
    </ListItem>
  );
};
