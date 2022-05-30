import React from 'react';
import Image from 'next/image';

import styles from '../styles/Photography.module.css';

const Photography = ({ src, alt }) => {
  return (
    <div className={styles.Photography}>
      <Image layout="fill" objectFit="contain" src={src} alt={alt} />
    </div>
  );
};

export default Photography;
