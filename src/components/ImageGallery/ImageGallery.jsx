import React from 'react';
import { List } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images, onImageClick }) => {
  return (
    <>
      <List>
        {images.map(image => (
          <ImageGalleryItem
            key={image.id}
            item={image}
            onImageClick={onImageClick}
          />
        ))}
      </List>
    </>
  );
};
