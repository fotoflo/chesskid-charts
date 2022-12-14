import fsPromises from "fs/promises";

import type { NextPage } from "next";

import RatingContainer from "components/rating/RatingContainer";
import Link from "next/link";
import { Container } from "react-bootstrap";
import { ServersideSessionHandler } from "lib/middleware";
import { useSession } from "next-auth/react";
import NavBar from "../components/NavBar";

import { trpc } from "../utils/trpc";
import Loading from "../components/Loading";
import loginToChesskid from "server/puppets/LoginToChesskid";

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
  // get the chesskid.com PHPSESSID cookie

  const [username, password] = [
    process.env.CHESSKID_USERNAME,
    process.env.CHESSKID_PASSWORD,
  ];

  if (!username || !password) {
    throw new Error(
      "CHESSKID_USERNAME and CHESSKID_PASSWORD must be set in .env"
    );
  }

  const cookie = await loginToChesskid(username, password);

  // fetch with a cookie
  const response = await fetch(
    `https://www.chesskid.com/callback/users/${username}/game-history?&limit=10000`,
    {
      headers: {
        accept: "*/*",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        cookie: `PHPSESSID=${cookie}`,
      },
      method: "GET",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch game history");
  }

  const data = await response.json();

  const props = {
    data,
  };

  return {
    props,
  };
};

export default Rating;
