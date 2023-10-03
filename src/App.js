import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "./components/ui/Navbar/Navbar";
import Footer from "./components/ui/Footer/Footer";
import Spinner from "./components/ui/Spinner/Spinner";
import UserProvider from "./components/context/UserContext";

function App() {
  const { state } = useNavigation();

  return (
    <>
      <UserProvider>
        <Navbar />
        <main style={{ marginBlock: "60px", flexGrow: 1, position: "relative" }}>
          {state === "loading" && <Spinner />}
          <Outlet />
        </main>
      </UserProvider>

      <Footer />
    </>
  );
}

export default App;
