import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>BookOrama - PBP</title>
        <meta name="description" content="BookOrama" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#fff] to-[#15162c]">
        <Link href="/login">Login</Link>
      </main>
    </>
  );
}
