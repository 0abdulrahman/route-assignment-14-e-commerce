import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "./components/ui/Navbar/Navbar";
import Footer from "./components/ui/Footer/Footer";
import Spinner from "./components/ui/Spinner/Spinner";

function App() {
  const { state } = useNavigation();

  console.log("App render");

  return (
    <>
      <Navbar />
      <main style={{ marginBlock: "60px", flexGrow: 1 }}>
        {state === "loading" && <Spinner />}
        {state === "idle" && <Outlet />}
      </main>
      <Footer />
    </>
  );
}

export default App;
