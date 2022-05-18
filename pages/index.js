import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Fotografías Llama</title>
        <meta name="description" content="Portafolio de fotografías" />
      </Head>
      <main className={styles.main}></main>
    </div>
  );
}
