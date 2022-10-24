import fsPromises from "fs/promises";

import type { NextPage } from "next";
import Head from "next/head";

import RatingContainer from "components/rating/RatingContainer";
import Link from "next/link";
import { Container } from "react-bootstrap";
import { ServersideSessionHandler } from "lib/middleware";
import { useSession } from "next-auth/react";
import NavBar from "../components/NavBar";

import { trpc } from "../utils/trpc";
import Loading from "../components/Loading";

const Rating: NextPage = ({ data, auth, themeToggler, ...props }) => {
  const { data: session, status } = useSession();
  console.log("data", { session, status });

  const hello = trpc.hello.useQuery({ text: "trpc client" });
  if (!hello.data) {
    return <Loading />;
  }

  return (
    <>
      <NavBar session={session} themeToggler={themeToggler} />
      <Container fluid={true}>
        <RatingContainer fullData={data} />
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const jsonData = await fsPromises.readFile(
    "sampleData/fullData.json", // fullData.json or shortSample.json
    "utf8"
  );
  const data = JSON.parse(jsonData);
  let session = await ServersideSessionHandler(context);
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
