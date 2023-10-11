import { BiSolidError } from "react-icons/bi";
import { useRouteError } from "react-router-dom";
import Footer from "./Footer/Footer";
import Navbar from "./Navbar/Navbar";

function Error() {
  const err = useRouteError();

  return (
    <>
      <Navbar />
      <main
        style={{ paddingBlock: "18rem" }}
        className="text-center bg-danger bg-opacity-10 flex-grow-1 position-relative px-3"
      >
        <h2 className="display-1 d-flex align-items-center justify-content-center gap-2 gap-sm-3">
          <span>
            <BiSolidError className="text-danger" />
          </span>
          ERROR
        </h2>
        <p className="mt-2 text-danger fs-5">
          {err?.data ?? err.error?.message ?? "Something went wrong, maybe refresh the page?"}
        </p>
      </main>
      <Footer />
    </>
  );
}

export default Error;
