import { getSession } from "next-auth/react";

import { NextPageContext, GetServerSideProps } from "next";

export const ServersideSessionHandler = async (context: NextPageContext) => {
  const session = await getSession(context);
  // const todoRefs = session
  //   ? await getTodoRefs((session?.user?.email as string) ?? "")
  //   : [];

  // console.log("SESSION", session);
  console.log("CONTEXT", context.req.url);

  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: "/rating",
      },
    };
  }

  return {
    props: {
      data: session,
      context,
    },
  };
};
