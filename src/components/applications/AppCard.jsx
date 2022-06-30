export default function AppCard({ app }) {
  return (
    <div className="p-md my-sm mx-xs bg-neutral-100 rounded-sm cursor-pointer">
      <div className="flex justify-between">
        <span>ID:</span>
        <span>{app.id}</span>
      </div>
      <div className="flex justify-between">
        <span>Name:</span>
        <span>{app.name}</span>
      </div>
      <div className="flex justify-between">
        <span>Lang:</span>
        <span>{app.lang}</span>
      </div>
      <div className="flex justify-between">
        <span>Version:</span>
        <span>{app.version}</span>
      </div>
    </div>
  );
}
