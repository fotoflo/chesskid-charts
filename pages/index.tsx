import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import GoogleLoginButton from "../components/auth/GoogleLoginButton";
import styles from "../styles/Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <GoogleLoginButton />

        <h1 className={styles.title}>Welcome to Chesskid Rating Charts!</h1>

        <p className={styles.description}>
          get your rating data from the chesskid api (see the readme file)
        </p>
        <p>
          then check&nbsp;
          <Link href="/rating">
            <a>Your Rating Charts!</a>
          </Link>
        </p>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
