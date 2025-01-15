"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import GoogleIcon from "@/icons/GoogleIcon";
import { signIn } from "next-auth/react";
import LoadingIcon from "@/icons/LoadingIcon";
import { userSchema } from "@/types/schema";

export default function Signin() {
  const router = useRouter();
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const [isValid, setIsValid] = useState(false);
  const [buttonLoadingCred, setButtonLoadingCred] = useState(false);
  const [buttonLoadingGoogle, setButtonLoadingGoogle] = useState(false);

  const checkFieldsValidity = () => {
    const username = usernameRef.current?.value?.trim() || "";
    const email = emailRef.current?.value?.trim() || "";
    const password = passRef.current?.value?.trim() || "";
    setIsValid(!!(username && email && password));
  };

  const successNotify = (msg: string) => toast.success(msg,{ autoClose: 1000})
  const errorNotify = (msg: string) => toast.error(msg,{ autoClose: 2000})

  const handleSignUp = async () => {
    setButtonLoadingCred(true);

    const userInput = {
      username: usernameRef.current?.value.trim(),
      email:  emailRef.current?.value.trim(),
      password: passRef.current?.value.trim(),
    }

    const userData = userSchema.safeParse(userInput)

    if(!userData.success){
      setButtonLoadingCred(false);
      errorNotify(userData.error.errors[0].message)
      return;
    }

    const { username, email, password  } = userData.data;

    const res = await signIn("credentials", {
      username,
      email,
      password,
      redirect: false,
    });
    
    if(res?.error === "Email is already taken"){
      errorNotify(res?.error)
    }

    if (!res?.error) {
      setButtonLoadingCred(false);
      router.push("/brain");
    }

    successNotify("Sign in successful")

  };

  const handleGoogleSignin = async () => {
    setButtonLoadingGoogle(true);
    const res = await signIn("google");

    if (!res?.error) {
      setButtonLoadingGoogle(false);
      successNotify("sign-in successful")
      router.push("/brain");
    } else {
      setButtonLoadingGoogle(false);
      errorNotify("Google sign-in failed");
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
      <Card className="p-2 max-w-fit max-h-fit">
        <div className="flex justify-center items-center p-2">
          <h1 className="text-2xl font-semibold">SignIn</h1>
        </div>
        <div className="flex flex-col space-y-4 p-4">
          <Input
            label="Username"
            type="text"
            placeholder="e.g: JohnDoe"
            required={true}
            refs={usernameRef}
            onChange={checkFieldsValidity}
          />
          <Input
            label="Email"
            type="email"
            required={true}
            placeholder="e.g: johndoe@example.com"
            refs={emailRef}
            onChange={checkFieldsValidity}
          />
          <Input
            label="Password"
            type="password"
            placeholder="********"
            required={true}
            refs={passRef}
            onChange={checkFieldsValidity}
          />
          {buttonLoadingCred ? (
            <Button className="p-4 flex justify-center items-center" disabled>
              <svg
                className="animate-spin h-5 w-5 mr-3 ..."
                viewBox="0 0 24 24"
              >
                <LoadingIcon />
              </svg>
              Signing in..
            </Button>
          ) : (
            <Button onClick={handleSignUp} disabled={!isValid}>
              Sign in
            </Button>
          )}
          {buttonLoadingGoogle ? (
            <Button
              className="bg-slate-100 text-black p-4 flex justify-center items-center"
              disabled
            >
              <svg
                className="animate-spin h-5 w-5 mr-3 ..."
                viewBox="0 0 24 24"
              >
                <LoadingIcon />
              </svg>
              Signing in..
            </Button>
          ) : (
            <Button
              onClick={handleGoogleSignin}
              className="bg-slate-100 text-black hover:bg-gray-400 flex items-center justify-center gap-2"
            >
              <div className="size-6">
                <GoogleIcon />
              </div>
              <div>Sign in with Google</div>
            </Button>
          )}
        </div>
      </Card>
      <ToastContainer position="top-right" limit={2} />
    </div>
  );
}
