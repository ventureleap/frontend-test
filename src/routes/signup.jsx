import SignUp from "../components/SignUp";
import Nav from "../components/Nav";

export default function SignUpPage() {
  return (
    <div>
      <Nav />
      <div className="max-w-screen-md mx-auto">
        <SignUp />
      </div>
    </div>
  );
}
