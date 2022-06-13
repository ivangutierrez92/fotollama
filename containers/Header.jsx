import React, { useState } from 'react';
import styles from '../styles/Header.module.css';
import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import Navigation from '../components/Navigation';
import Link from 'next/link';

const Header = ({ tabIndex }) => {
  const [toggle, setToggle] = useState(false);
  const isPhone = useMediaQuery({
    query: '(max-width: 800px)',
  });
  const menu = {
    visible: { height: 'auto' },
    hidden: { height: 0, display: 'none' },
  };

  const list = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };
  return (
    <header className={styles.Header}>
      <Link href="/">
        <a className={styles.MainLink} tabIndex={tabIndex}>
          <h1 className={styles['Header__title']}>Iván Gutiérrez</h1>
          <h2 className={styles['Header__subTitle']}>Fotógrafo</h2>
        </a>
      </Link>
      <button
        className={styles.ToggleButton}
        onClick={() => setToggle(state => !state)}
        tabIndex={tabIndex}
      >
        MENÚ
      </button>
      <motion.nav
        className={`${styles['Header__nav']} ${toggle ? undefined : styles.closed}`}
        animate={isPhone ? (toggle ? 'visible' : 'hidden') : 'visible'}
        variants={menu}
        initial={isPhone ? 'hidden' : 'visible'}
        transition={
          isPhone ? (toggle ? { ease: 'linear', duration: 0.2 } : { duration: 0 }) : { duration: 0 }
        }
      >
        <motion.div
          className={styles.wrapper}
          variants={list}
          transition={
            isPhone
              ? toggle
                ? { ease: 'linear', duration: 0.2 }
                : { duration: 0 }
              : { duration: 0 }
          }
        >
          <Navigation tabIndex={tabIndex} styles={styles} />
        </motion.div>
      </motion.nav>
    </header>
  );
};

export default Header;
