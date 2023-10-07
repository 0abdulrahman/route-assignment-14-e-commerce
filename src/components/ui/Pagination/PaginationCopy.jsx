import "./Pagination.module.css";
import { useEffect, useState } from "react";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";

function Pagination({ handleNext, handlePrev, handleNavigate }) {
  const [onSmallScreens, setOnSmallScreens] = useState(false);

  const [metaData, setMetaData] = useState({
    currentPage: 5,
    numberOfPages: 10,
    limit: 40,
    prevPage: 4,
    nextPage: 6,
  });

  useEffect(() => {
    if (window.innerWidth < 576) setOnSmallScreens(true);
  }, []);

  const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);
  return (
    <nav aria-label="Products pagination">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${!metaData?.prevPage ? "disabled" : ""}`}>
          {!metaData?.prevPage ? (
            <span className="page-link">{onSmallScreens ? <MdOutlineNavigateBefore /> : "Previous"}</span>
          ) : (
            <button
              className="page-link"
              onClick={() =>
                setMetaData((prev) => ({
                  ...prev,
                  currentPage: prev.currentPage - 1,
                  prevPage: prev.prevPage - 1,
                  nextPage: prev.nextPage - 1,
                }))
              }
            >
              {onSmallScreens ? <MdOutlineNavigateBefore /> : "Previous"}
            </button>
          )}
        </li>
        {metaData?.currentPage > 5 ? (
          <>
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => setMetaData((prev) => ({ ...prev, currentPage: 1, prevPage: null, nextPage: 2 }))}
              >
                1
              </button>
            </li>
            <li className="page-item">
              <span className="page-link">...</span>
            </li>
          </>
        ) : (
          ""
        )}
        {range(
          metaData?.currentPage > 5 ? (onSmallScreens ? metaData?.currentPage - 1 : metaData?.currentPage - 2) : 1,
          metaData?.nextPage + 2 < metaData?.numberOfPages
            ? onSmallScreens
              ? metaData?.currentPage + 1
              : metaData?.currentPage + 2
            : metaData?.currentPage + 2 < metaData?.numberOfPages
            ? onSmallScreens
              ? metaData?.currentPage + 1
              : metaData?.numberOfPages
            : metaData?.numberOfPages - metaData?.nextPage === 0
            ? metaData?.currentPage + 1
            : metaData?.currentPage,
          1
        ).map((i) => (
          <li className="page-item" key={i}>
            <button
              className={`page-link ${metaData?.currentPage === i ? "active" : ""}`}
              aria-current={metaData?.currentPage === i ? "page" : ""}
              onClick={() => setMetaData((prev) => ({ ...prev, currentPage: i, prevPage: i - 1, nextPage: i + 1 }))}
            >
              {i}
            </button>
          </li>
        ))}
        {metaData?.currentPage + 3 < metaData?.numberOfPages ? (
          <>
            <li className="page-item">
              <span className="page-link">...</span>
            </li>
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => setMetaData((prev) => ({ ...prev, currentPage: 10, prevPage: 9, nextPage: null }))}
              >
                {metaData?.numberOfPages}
              </button>
            </li>
          </>
        ) : (
          ""
        )}
        <li className={`page-item ${!metaData?.nextPage ? "disabled" : ""}`}>
          {!metaData?.nextPage ? (
            <span className="page-link">{onSmallScreens ? <MdOutlineNavigateNext /> : "Next"}</span>
          ) : (
            <button
              className="page-link"
              onClick={() =>
                setMetaData((prev) => ({
                  ...prev,
                  currentPage: prev.currentPage + 1,
                  prevPage: prev.prevPage + 1,
                  nextPage: prev.nextPage + 1,
                }))
              }
            >
              {onSmallScreens ? <MdOutlineNavigateNext /> : "Next"}
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
