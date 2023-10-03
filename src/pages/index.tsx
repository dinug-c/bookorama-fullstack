/* eslint-disable @typescript-eslint/no-misused-promises */
import { Profile, Lock } from "iconsax-react";
import { useRouter } from "next/router";
import React from "react";
import { Cookies } from "react-cookie";
import { useForm } from "react-hook-form";
import ButtonCustom from "~/components/button";
import ErrorCard from "~/components/card";
import TextFieldInput from "~/components/input";

interface loginProps {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const cookies = new Cookies();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formSubmit = async ({ email, password }: loginProps) => {
    try {
      const body: loginProps = {
        email: email,
        password: password,
      };
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        cookies.set("admin", "true", { path: "/" });
        await router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-indigo-100/50">
      <div className="grid w-3/4 grid-cols-2 rounded-lg bg-white shadow-sm">
        <div className="p-20">
          <h2 className="text-3xl font-bold ">Welcome Back!</h2>
          <p className="mt-2">
            Enter your account and start{" "}
            <span className="bg-gradient-to-tr from-indigo-500 to-blue-500 bg-clip-text font-bold text-transparent">
              Explore the World
            </span>
          </p>
          <form onSubmit={handleSubmit(formSubmit)}>
            <TextFieldInput
              register={register}
              type="email"
              placeholder="Email"
              name="email"
            />
            {errors.email && (
              <ErrorCard text="Email is required and must be valid." />
            )}
            <TextFieldInput
              register={register}
              type="password"
              placeholder="Password"
              name="password"
            />
            {errors.password && <ErrorCard text="Password is required." />}
            <ButtonCustom
              text="Login"
              backgroundColor="bg-indigo-500"
              hoverBackgroundColor="bg-indigo-700"
              color="white"
            />
          </form>
        </div>
        <div className="flex h-full w-full flex-col items-center justify-center rounded-br-lg rounded-tr-lg bg-indigo-400">
          <h1 className="text-3xl font-semibold text-white">BookOrama</h1>
          <p className="mt-2 text-white">Find and save your favorites Books!</p>
        </div>
      </div>
    </div>
  );
}
