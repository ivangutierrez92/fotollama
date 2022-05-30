import React from 'react';
import styles from '../styles/Modal.module.css';
import { faXmark, faGreaterThan, faLessThan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion, AnimatePresence } from 'framer-motion';

const variants = {
  enter: direction => {
    return { x: direction > 0 ? 1000 : -1000, opacity: 0 };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: direction => {
    return { zIndex: 0, x: direction > 0 ? -1000 : 1000, opacity: 0 };
  },
};

const Modal = ({ children, onClose, onPrev, onNext, onKeyDown, focusref, animationKey }) => {
  return (
    <div className={styles.Modal} onKeyDown={onKeyDown} tabIndex="0" ref={focusref}>
      <button className={`${styles.close} ${styles.button}`} onClick={onClose}>
        <FontAwesomeIcon icon={faXmark} />
      </button>
      <button className={`${styles.prev} ${styles.button} ${styles.sideButton}`} onClick={onPrev}>
        <FontAwesomeIcon icon={faLessThan} />
      </button>
      <div className={styles.SliderContainer}>
        <AnimatePresence>
          <motion.div
            custom={animationKey.direction}
            className={styles.Slider}
            key={animationKey.index}
            variants={variants}
            initial={'enter'}
            animate={'center'}
            exit={'exit'}
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
      <button className={`${styles.next} ${styles.button} ${styles.sideButton}`} onClick={onNext}>
        <FontAwesomeIcon icon={faGreaterThan} />
      </button>
    </div>
  );
};

export default Modal;
