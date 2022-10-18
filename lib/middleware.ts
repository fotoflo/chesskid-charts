import { getSession } from "next-auth/react";

export const ServersideSessionHandler: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  // const todoRefs = session
  //   ? await getTodoRefs((session?.user?.email as string) ?? "")
  //   : [];

  console.log("SESSION", session);

  if (session && context.resolvedUrl === "/home") {
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
    },
  };
};
