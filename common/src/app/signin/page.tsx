"use client";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import GoogleIcon from "@/icons/GoogleIcon";
import { useRef } from "react";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const handleSignUp = async () => {
    const username = usernameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passRef.current?.value;
    if (!username || !email || !password) {
      alert("Please fill all the fields");
      return;
    }

    const res = await signIn("credentials", {
      username: username,
      email: email,
      password: password,
      redirect: false,
    });

    if (!res?.error) {
      router.push("/");
      toast.success("Signed In");
    }
  };

  const handleGoogleSignin = async () => {
    const res = await signIn("google", {
      redirect: false,
    });

    if(!res?.error) {
      router.push("/");
      toast.success("Signed In");
    }

  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="p-2">
        <div className="flex justify-center items-center p-2">
          <h1 className="text-2xl font-semibold">SignIn</h1>
        </div>
        <div className="flex flex-col space-y-4 p-4">
          <Input
            label="Username"
            type="username"
            placeholder="e.g: JohnDoe"
            refs={usernameRef}
          />
          <Input
            label="Email"
            type="email"
            refs={emailRef}
            placeholder="eg: johndoe@exmaple.com"
          />
          <Input
            label="Password"
            type="password"
            placeholder="********"
            refs={passRef}
          />
          <Button onClick={handleSignUp}>Sign in</Button>
          <Button
            onClick={handleGoogleSignin}
            className="bg-blue-700 hover:bg-blue-800  flex items-center justify-center gap-2"
          >
            <div className="size-6">
              <GoogleIcon />
            </div>
            <div className="">Sign in with Google</div>
          </Button>
        </div>
      </Card>
    </div>
  );
}
