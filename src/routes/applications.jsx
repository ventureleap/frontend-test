import Nav from "../components/Nav";
import Applications from "../components/applications";

export default function ApplicationsPage() {
  return (
    <div>
      <Nav />
      <div className="max-w-screen-md mx-auto">
        <Applications />
      </div>
    </div>
  );
}
