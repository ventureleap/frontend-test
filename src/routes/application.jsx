import Nav from "../components/Nav";
import Application from "../components/applications/Application";

export default function ApplicationPage({ app }) {
  return (
    <div>
      <Nav />
      <div className="max-w-screen-md mx-auto">
        <Application app={app} />
      </div>
    </div>
  );
}
