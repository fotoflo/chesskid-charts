import { ServersideSessionHandler } from "lib/middleware";
import type { GetServerSideProps, NextPage } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

import Loading from "components/Loading";

const Index: NextPage<{ data: Session }> = ({ data: session }) => {
  // if there's no session,
  // middleware redirects us to /home

  const router = useRouter();
  // const [loading, setLoading] = useState(!!session);
  useEffect(() => {
    router.push("/rating");
  });

  return <Loading />;
};

export default Index;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return ServersideSessionHandler(context);
};
