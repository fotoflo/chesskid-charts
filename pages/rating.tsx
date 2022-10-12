import fsPromises from "fs/promises";

import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";

import RatingContainer from "components/RatingContainer";
import Link from "next/link";

const Rating: NextPage = (props) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Your Ratings</title>
        <meta name="description" content="ChessKid Ratings Analyser" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Link href="/">&lt; back</Link>
        <RatingContainer data={props} />
      </main>
    </div>
  );
};

export async function getStaticProps(context) {
  const jsonData = await fsPromises.readFile(
    "sampleData/fullData.json",
    "utf8"
  );
  const data = JSON.parse(jsonData);
  return {
    props: data, // will be passed to the page component as props
  };
}

export default Rating;
