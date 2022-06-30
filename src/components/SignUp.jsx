import Button from "./ui/Button";
import Input from "./ui/Input";
import { Card, CardContent, CardTitle } from "./ui/Card";
import { useState } from "react";
import { register } from "../api/user";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        setErrorMessage("");
        setIsLoading(true);
        const res = await register({
          firstName,
          lastName,
          username: emailAddress,
          password,
        });
        setIsLoading(false);
        if (res.error) {
          setErrorMessage(res.error.message);
        } else {
          window.location.href = "/user/login";
        }
      }}
    >
      <Card>
        <CardTitle>Register</CardTitle>
        <CardContent>
          {errorMessage && (
            <div className="my-xs text-red-600">{errorMessage}</div>
          )}
          <div className="flex flex-wrap mb-xs">
            <div className="w-full md:w-6/12 pr-2">
              <Input
                type="text"
                label="First name"
                required
                onChange={(event) => setFirstName(event.target.value)}
              />
            </div>
            <div className="w-full md:w-6/12">
              <Input
                type="text"
                label="Last name"
                required
                onChange={(event) => setLastName(event.target.value)}
              />
            </div>
          </div>
          <div className="mb-xs">
            <Input
              type="email"
              label="Email*"
              required
              onChange={(event) => setEmailAddress(event.target.value)}
            />
          </div>
          <div className="mb-xs">
            <Input
              type="password"
              label="Password*"
              required
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="my-xs">
            <Button submit isLoading={isLoading}>
              Sign up
            </Button>
          </div>
          <hr className="my-sm text-neutral-200" />
          <div className="self-start text-neutral-500">
            By clicking the 'Sign up' button, you confirm that you accept our{" "}
            <span className="underline cursor-pointer text-primary">
              Term of Use
            </span>{" "}
            and{" "}
            <span className="underline cursor-pointer text-primary">
              Privacy Policy
            </span>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
