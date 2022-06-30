import { Card, CardTitle, CardContent } from "../ui/Card";
import Input from "../ui/Input";
import { update } from "../../api/application";
import { useStore } from "../../store";
import { useState } from "react";
import Button from "../ui/Button";
import { useParams } from "react-router-dom";

export default function Application() {
  const params = useParams();
  const appId = params.id;
  const applications = useStore((state) => state.applications);
  const app = applications[appId];
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState(app.username);
  const [version, setVersion] = useState(app.version);
  const [lang, setLang] = useState(app.lang);

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        setErrorMessage("");
        setIsLoading(true);
        const res = await update(appId, {
          username,
          version,
        });
        setIsLoading(false);
        if (res.error) {
          setErrorMessage(res.error.message);
        }
      }}
    >
      <Card>
        <CardTitle>Application</CardTitle>
        <CardContent>
          {errorMessage && (
            <div className="my-xs text-red-600">{errorMessage}</div>
          )}
          <div className="mb-xs">
            <Input label="Id" disabled type="text" value={app.id} />
          </div>
          <div className="mb-xs">
            <Input label="Name" disabled type="text" value={app.name} />
          </div>
          <div className="mb-xs">
            <Input
              label="Language"
              type="text"
              onChange={(event) => setLang(event.target.value)}
              value={lang}
            />
          </div>
          <div className="mb-xs">
            <Input
              label="Version"
              type="text"
              onChange={(event) => setVersion(event.target.value)}
              value={version}
            />
          </div>
          <div className="mb-xs">
            <Input
              label="Username"
              type="text"
              onChange={(event) => setUsername(event.target.value)}
              value={username}
            />
          </div>
          <div className="mt-sm">
            <Button submit isLoading={isLoading}>
              Update
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
