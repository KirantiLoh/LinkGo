import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { api } from "../utils/api";

import "../styles/globals.css";
import { DashboardProvider } from "src/context/DashboardContext";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>LinkGo - All your links in one place</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashboardProvider>
        <Component {...pageProps} />
      </DashboardProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
