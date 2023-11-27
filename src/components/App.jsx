import React, { Component } from 'react';
import axios from 'axios';
import { GlobalStyle } from './GlobalStyle';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from '../components/ImageGallery/ImageGallery';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Layout } from './Layout/Layout';

import { Loader } from '../components/Loader/Loader';
import { Button } from 'components/Button/Button';
import Modal from 'components/Modal/Modal';

export default class App extends Component {
  state = {
    images: [],
    isLoading: false,
    error: null,
    query: '',
    page: 1,
    isShowModal: false,
    selectedImage: null,
    isLastPage: false,
  };

  handleSearchSubmit = query => {
    if (this.state.query === query) {
      return;
    }
    this.setState({
      query: query,
      page: 1,
      images: [],
      error: null,
      isLastPage: false,
    });
  };

  componentDidUpdate(_prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.setState({ images: [], page: 1, isLastPage: false }, () => {
        this.fetchImages();
      });
    }
  }

  fetchImages = () => {
    const { query, page } = this.state;
    const API_KEY = '34187261-edb3bdfe414ee3b7adebeccc5';

    this.setState({ isLoading: true });

    axios
      .get(
        `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
      .then(response => {
        const { hits, totalHits } = response.data;

        if (hits.length === 0) {
          return toast('Sorry, there are no images matching your request...', {
            position: toast.POSITION.TOP_CENTER,
            icon: '🤔',
          });
        }

        const modifiedHits = hits.map(
          ({ id, tags, webformatURL, largeImageURL }) => ({
            id,
            tags,
            webformatURL,
            largeImageURL,
          })
        );

        this.setState(prevState => ({
          images: [...prevState.images, ...modifiedHits],
          page: prevState.page + 1,
          isLastPage:
            prevState.images.length + modifiedHits.length >= totalHits,
        }));
      })
      .catch(error => {
        this.setState({ error: error.message });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  setModalData = modalData => {
    this.setState({ modalData, isShowModal: true });
  };

  handleModalClose = () => {
    this.setState({ isShowModal: false });
  };

  render() {
    const { images, isLoading, error, isShowModal, isLastPage, modalData } =
      this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        {error && <p>Error: {error}</p>}
        <Layout>
          <ImageGallery images={images} onImageClick={this.setModalData} />

          {isLoading && <Loader />}

          {!isLoading && images.length > 0 && !isLastPage && (
            <Button onClick={this.fetchImages} />
          )}

          {isShowModal && (
            <Modal modalData={modalData} onModalClose={this.handleModalClose} />
          )}
        </Layout>
        <ToastContainer transition={Slide} draggablePercent={60} />
        <GlobalStyle />
      </>
    );
  }
}
