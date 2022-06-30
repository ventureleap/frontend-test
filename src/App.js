import Nav from "./components/Nav";
import { Card, CardTitle } from "./components/ui/Card";

function App() {
  // const user = useStore((state) => state.user);
  // const setUser = useStore((state) => state.setUser);

  // useEffect(() => {
  //   async function fetchUserInfo() {
  //     const res = await getInfo();
  //     setUser(res);
  //   }
  //   fetchUserInfo();
  // }, []);
  return (
    <div>
      <Nav />
      <div className="max-w-screen-md mx-auto">
        <Card>
          <CardTitle>Home</CardTitle>
        </Card>
      </div>
      {/* {user} */}
    </div>
  );
}

export default App;
