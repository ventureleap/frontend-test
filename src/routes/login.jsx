import Login from "../components/Login";
import Nav from "../components/Nav";
export default function LoginPage() {
  return (
    <div>
      <Nav />
      <div className="max-w-screen-md mx-auto">
        <Login />
      </div>
    </div>
  );
}
