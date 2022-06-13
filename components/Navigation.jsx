import { useRouter } from 'next/router';
import React from 'react';
import folders from '../utils/folders';
import Link from 'next/link';

const NavigationLinks = ({ tabIndex = undefined, styles }) => {
  const router = useRouter();
  return (
    <>
      {folders.map((folder, key) => (
        <Link href={`/${folder}`} key={`Link-${key}`}>
          <a
            className={`${styles['Header__anchor']} ${
              router.asPath == `/${folder}` ? styles.active : undefined
            }`}
            tabIndex={tabIndex}
          >
            {folder.split('-').join(' ')}
          </a>
        </Link>
      ))}
    </>
  );
};

export default NavigationLinks;
