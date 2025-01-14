"use client";
import { Button } from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import GoogleIcon from "@/icons/GoogleIcon";
import { useRef, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoadingIcon from "@/icons/LoadingIcon";

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

  const handleSignUp = async () => {
    setButtonLoadingCred(true);
    const username = usernameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passRef.current?.value;

    if (!username || !email || !password) {
      alert("Please fill all the fields");
      setButtonLoadingCred(false);
      return;
    }

    const res = await signIn("credentials", {
      username,
      email,
      password,
      redirect: false,
    });

    if (!res?.error) {
      setButtonLoadingCred(false);
      router.push("/brain");
    }
  };

  const handleGoogleSignin = async () => {
    setButtonLoadingGoogle(true);
    const res = await signIn("google");

    if (!res?.error) {
      setButtonLoadingGoogle(false);
      router.push("/brain");
    } else {
      setButtonLoadingGoogle(false);
      alert("Google sign-in failed");
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
    </div>
  );
}
