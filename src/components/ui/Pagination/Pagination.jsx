import "./Pagination.module.css";
import { useEffect, useState } from "react";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";

function Pagination({ metaData, handleNext, handlePrev, handleNavigate }) {
  const [onSmallScreens, setOnSmallScreens] = useState(false);

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
            <button className="page-link" onClick={handlePrev}>
              {onSmallScreens ? <MdOutlineNavigateBefore /> : "Previous"}
            </button>
          )}
        </li>
        {metaData?.currentPage > 3 ? (
          <>
            <li className="page-item">
              <button className="page-link" onClick={() => handleNavigate(1)}>
                1
              </button>
            </li>
            <li className="page-item disabled">
              <button className="page-link">...</button>
            </li>
          </>
        ) : (
          ""
        )}
        {range(
          metaData?.currentPage > 3 ? (onSmallScreens ? metaData?.currentPage - 1 : metaData?.currentPage - 2) : 1,
          metaData?.nextPage + 2 < metaData?.numberOfPages
            ? onSmallScreens
              ? metaData?.currentPage + 1
              : metaData?.currentPage + 2
            : metaData?.numberOfPages - metaData?.nextPage === 0
            ? metaData?.currentPage + 1
            : metaData?.currentPage,
          1
        ).map((i) => (
          <li className="page-item" key={i}>
            <button
              className={`page-link ${metaData?.currentPage === i ? "active" : ""}`}
              aria-current={metaData?.currentPage === i ? "page" : ""}
              onClick={() => handleNavigate(i)}
            >
              {i}
            </button>
          </li>
        ))}
        {metaData?.currentPage + 3 < metaData?.numberOfPages ? (
          <>
            <li className="page-item disabled">
              <button className="page-link">...</button>
            </li>
            <li className="page-item">
              <button className="page-link" onClick={() => handleNavigate(metaData?.numberOfPages)}>
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
            <button className="page-link" onClick={handleNext}>
              {onSmallScreens ? <MdOutlineNavigateNext /> : "Next"}
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
