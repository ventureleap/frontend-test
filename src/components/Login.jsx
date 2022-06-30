import Button from "./ui/Button";
import Input from "./ui/Input";
import { Card, CardContent, CardTitle } from "./ui/Card";
import { useState } from "react";
import { login } from "../api/user";

export default function Login() {
  //   const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        setErrorMessage("");
        setIsLoading(true);
        // const res = await login(email, password, rememberMe);
        // console.log("res", res);
        // if (res.login.message) {
        //   setIsLoading(false);
        //   setErrorMessage(res.login.message);
        // } else if (res.login.id) {
        //   window.location.href = "/profile";
        // }
        const res = await login({
          username: username,
          password: password,
        });
        setIsLoading(false);
        if (res.error) {
          setErrorMessage(res.error.message);
        } else {
          window.location.href = "/user";
        }
        // console.log("res", await res.json());
      }}
    >
      <Card>
        <CardTitle>Log In</CardTitle>
        <CardContent>
          {errorMessage && (
            <div className="my-xs text-red-600">{errorMessage}</div>
          )}
          <div className="mb-xs">
            <Input
              label="Username*"
              onChange={(event) => setUsername(event.target.value)}
              required
              type="text"
            />
          </div>
          <div className="mb-xs">
            <Input
              label="Password*"
              onInput={(event) => setPassword(event.target.value)}
              required
              type="password"
            />
          </div>
          <div className="self-start">
            <Button submit isLoading={isLoading}>
              Login
            </Button>
          </div>
          <hr className="my-sm text-neutral-200" />
          <div className="text-gray-500">
            <span>Don't have an account? </span>
            <a className="text-primary">Sign up</a>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
