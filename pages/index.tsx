import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import Dashboard from "../components/Dashboard";
import Loader from "../components/Loader";

const Home: NextPage = () => {
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/signin");
    },
  });
  console.log(session)

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <div>
      <Head>
        <title>Spotify- Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Dashboard />
    </div>
  );
};

export default Home;
