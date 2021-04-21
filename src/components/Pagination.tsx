import React, { useEffect, useState } from "react";
import "./Pagination.scss";

type Props = {
  setPage(page: number): void;
  activePage: number;
  pokemonCount: number;
  limit: number;
};

export function Pagination(props: Props) {
  const [pageList, setPageList] = useState<number[]>([]);
  const { setPage, activePage, pokemonCount, limit } = props;
  const [totalPageCount, setTotalPageCount] = useState<number>(
    Math.ceil(pokemonCount / limit)
  );

  useEffect(() => {
    const currentPageList = [] as number[];

    for (
      let i = activePage - 2;
      i <= activePage + 2 && i < totalPageCount;
      i++
    ) {
      if (i >= 0) {
        currentPageList.push(i);
      }
    }

    setPageList(currentPageList);
  }, [limit, activePage, pokemonCount, totalPageCount]);

  useEffect(() => {
    setTotalPageCount(Math.ceil(pokemonCount / limit));
  }, [pokemonCount, limit]);

  return pageList.length > 1 ? (
    <div className="pagination">
      <div key="previous">
        <button
          onClick={(e) => setPage(0)}
          className={`pagination-button ${activePage === 0 ? "active" : ""}`}
        >
          {"<<"}
        </button>
      </div>

      {pageList.map((page: number) => (
        <div key={page}>
          <button
            onClick={() => setPage(page)}
            className={`pagination-button ${
              activePage === page ? "active" : ""
            }`}
          >
            {page + 1}
          </button>
        </div>
      ))}

      <div key="next">
        <button
          onClick={(e) => setPage(totalPageCount - 1)}
          className={`pagination-button ${
            activePage === totalPageCount - 1 ? "active" : ""
          }`}
        >
          {">>"}
        </button>
      </div>
    </div>
  ) : null;
}
