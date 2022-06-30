import { Card, CardTitle, CardContent } from "../ui/Card";
import { useStore } from "../../store";
import { useEffect } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import SkeletonLoading from "../ui/SkeletonLoading";
import { Link } from "react-router-dom";

export default function User() {
  const user = useStore((state) => state.user);
  const fetchUserInfo = useStore((state) => state.fetchUserInfo);
  const loading = useStore((state) => state.loading);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);
  return (
    <Card>
      <CardTitle>Info</CardTitle>
      <CardContent>
        {!user && loading && <SkeletonLoading rows={3} />}
        {user && (
          <>
            <div className="mb-xs">
              <Input
                label="Username"
                disabled
                type="text"
                value={user.username}
              />
            </div>
            <div className="mb-xs">
              <Input
                label="Password"
                disabled
                type="password"
                value={user.password}
              />
            </div>
            {user.firstName && (
              <div className="mb-xs">
                <Input
                  label="First name"
                  disabled
                  type="text"
                  value={user.firstName}
                />
              </div>
            )}
            {user.lastName && (
              <div className="mb-xs">
                <Input
                  label="Last name"
                  disabled
                  type="text"
                  value={user.lastName}
                />
              </div>
            )}
          </>
        )}
        <div className="mt-sm">
          <Link to="/user/login">
            <Button>Login</Button>
          </Link>
          <Link to="/user/signup">
            <Button type="transparent">Register</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
