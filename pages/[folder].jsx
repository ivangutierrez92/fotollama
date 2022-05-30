import React, { useState, useRef, useEffect } from 'react';
import Polaroid from '../components/Polaroid';
import styles from '../styles/Folder.module.css';
import folders from '../utils/images';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Modal from '../containers/Modal';
import Photography from '../components/Photography';
import Head from 'next/head';

export async function getStaticPaths() {
  const paths = folders.map(folder => ({
    params: { folder: folder.name },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const folder = folders.find(folder => folder.name == params.folder);
  return {
    props: {
      folder: folder.name,
      images: folder.images,
      key: folder.name,
    },
  };
}

const Folder = ({ folder, images }) => {
  const [modal, setModal] = useState(false);
  const [imageSelected, setImageSelected] = useState({ index: 0, direction: 1 });
  const focusModal = useRef();
  const folderName = folder.split('-').join(' ');
  useEffect(() => {
    if (focusModal.current) {
      focusModal.current.focus();
    }
  }, [modal]);

  const openModal = index => {
    if (!modal) {
      setImageSelected(state => ({ ...state, index: index }));
      setModal(true);
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = () => {
    setModal(false);
    document.body.style.overflow = 'initial';
  };

  const nextImage = () => {
    if (images.length - 1 === imageSelected.index) {
      setImageSelected({ index: 0, direction: 1 });
    } else {
      setImageSelected(state => ({ index: state.index + 1, direction: 1 }));
    }
  };

  const prevImage = () => {
    if (imageSelected.index === 0) {
      setImageSelected({ index: images.length - 1, direction: -1 });
    } else {
      setImageSelected(state => ({ index: state.index - 1, direction: -1 }));
    }
  };

  const handleKeyDown = e => {
    if (modal) {
      switch (e.key) {
        case 'ArrowLeft':
          prevImage();
          break;
        case 'ArrowRight':
          nextImage();
          break;
        case 'Escape':
          closeModal();
      }
    }
  };

  return (
    <>
      <Head>
        <title>{`Fotollama - ${folderName}`}</title>
        <meta name="description" content="Portafolio de fotografías de Iván Gutiérrez" />
        <meta property="og:title" content={folderName} />
        <meta
          property="og:description"
          content={`Portafolio de fotografías de Iván Gutiérrez, carpeta ${folderName}`}
        />
        <meta property="og:image" content="social-logo.png" />
        <meta property="twitter:title" content={folderName} />
        <meta
          property="twitter:description"
          content={`Portafolio de fotografías de Iván Gutiérrez, carpeta ${folderName}`}
        />
        <meta property="twitter:image" content="social-logo.png" />
        <meta property="twitter:image:alt" content="Fotografía polaroid del logo de una llama" />
      </Head>
      <Header tabIndex={modal ? -1 : undefined} />
      <main className={styles.Folder}>
        {images.map((image, key) => (
          <Polaroid
            src={`/images/${folder}/${image.src}`}
            alt={image.text}
            key={key}
            onClick={() => openModal(key)}
            tabIndex={modal ? -1 : undefined}
          />
        ))}
      </main>
      {modal && (
        <Modal
          onClose={closeModal}
          onPrev={prevImage}
          onNext={nextImage}
          onKeyDown={handleKeyDown}
          focusref={focusModal}
          animationKey={imageSelected}
        >
          <Photography
            src={`/images/${folder}/${images[imageSelected.index].src}`}
            alt={images[imageSelected.index].text}
          />
        </Modal>
      )}
      <Footer tabIndex={modal ? -1 : undefined} />
    </>
  );
};

export default Folder;
