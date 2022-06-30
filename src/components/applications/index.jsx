import { Card, CardTitle, CardContent } from "../ui/Card";
import { useStore } from "../../store";
import { useEffect } from "react";
import SkeletonLoading from "../ui/SkeletonLoading";
import AppCard from "./AppCard";
import { Link } from "react-router-dom";

export default function Applications() {
  const applications = useStore((state) => state.applications);
  const fetchApplications = useStore((state) => state.fetchApplications);
  const loading = useStore((state) => state.loading);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);
  return (
    <Card>
      <CardTitle>Applications</CardTitle>
      <CardContent>
        {Object.keys(applications).length === 0 && loading && (
          <SkeletonLoading rows={3} />
        )}
        <div className="flex flex-wrap">
          {Object.keys(applications).map((key, index) => (
            <div className="w-full md:w-1/2" key={index}>
              <Link to={`/applications/${applications[key].id}`}>
                <AppCard app={applications[key]} />
              </Link>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
