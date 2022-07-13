import React from 'react';
import Image from 'next/image';
import styles from '../styles/Polaroid.module.css';

const Polaroid = ({ src, alt, onClick = undefined, tabIndex = undefined }) => {
  return (
    <button className={styles.Polaroid} onClick={onClick} tabIndex={tabIndex}>
      <Image width={450} height={300} src={src} alt={alt} />
    </button>
  );
};

export default Polaroid;
