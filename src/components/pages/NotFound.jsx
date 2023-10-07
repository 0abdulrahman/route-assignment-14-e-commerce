import NotFoundImg from "../../assets/images/404.webp";

function NotFound() {
  return (
    <section className="d-flex flex-column justify-content-center align-items-center py-5">
      <img src={NotFoundImg} alt="404 Not Found" style={{ width: "80vw", maxWidth: "60rem" }} />
      <h2 className="mt-5 text-success px-2 text-center fs-3">Couldn't find the page you're looking for :(</h2>
    </section>
  );
}

export default NotFound;
