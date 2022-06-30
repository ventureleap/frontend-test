import Nav from "../components/Nav";
import User from "../components/user";

export default function UserPage() {
  return (
    <div>
      <Nav />
      <div className="max-w-screen-md mx-auto">
        <User />
      </div>
    </div>
  );
}
