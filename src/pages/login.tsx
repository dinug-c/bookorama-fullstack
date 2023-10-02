import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import ButtonCustom from "~/components/button";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Di sini Anda dapat menambahkan logika validasi dan otentikasi
    if (email && password) {
      // Contoh validasi sederhana
      console.log("Email:", email);
      console.log("Password:", password);
    } else {
      alert("Email dan password harus diisi.");
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="BookOrama" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#fff] to-[#15162c]">
        <div className="card">
          <h2>Login Form</h2>
          <div className="form-group flex-1">
            <p>email</p>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <p>password</p>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <ButtonCustom text="Login" />
        </div>
      </main>
    </>
  );
}

