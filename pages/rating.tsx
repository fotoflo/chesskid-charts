import fsPromises from "fs/promises";

import type { NextPage } from "next";
import Head from "next/head";

import RatingContainer from "components/RatingContainer";
import Link from "next/link";
import { Container } from "react-bootstrap";
import { ServersideSessionHandler } from "lib/middleware";
import { useSession } from "next-auth/react";
import NavBar from "../components/NavBar";

const Rating: NextPage = ({ data, auth }) => {
  const { data: session, status } = useSession();
  console.log("data", { session, status });
  return (
    <>
      <NavBar />
      <Container>
        <Link href="/">&lt; back</Link>
        <RatingContainer data={data} />
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const jsonData = await fsPromises.readFile(
    "sampleData/fullData.json",
    "utf8"
  );
  const data = JSON.parse(jsonData);
  let session = await ServersideSessionHandler(context);
  console.log({ session });
  const props = {
    data,
  };

  return {
    props,
  };
};

// export async function getStaticProps(context) {
//   const jsonData = await fsPromises.readFile(
//     "sampleData/fullData.json",
//     "utf8"
//   );
//   const data = JSON.parse(jsonData);
//   return {
//     props: data, // will be passed to the page component as props
//   };
// }

export default Rating;
