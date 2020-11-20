import React, { useEffect, useState } from 'react';
import './Pagination.scss'

interface IPagination {
    setPage(page:number): void,
    active: number,
    pokemonCount: number,
    limit: number,
}

export function Pagination (props: IPagination ) {

    const [pageList, setPageList] = useState<number[]>([]);
    const { setPage, active, pokemonCount, limit } = props;
    const [totalPageCount, setTotalPageCount] = useState<number>(Math.ceil(pokemonCount / limit))
    
    useEffect(() => {
        const currentPageList = [] as number[];

        for (let i = active - 2; i <= active + 2 && i < totalPageCount; i++) {
            if (i >= 0) {
                currentPageList.push(i);
            }
        }

        setPageList(currentPageList);
    }, [limit, active, pokemonCount, totalPageCount])

    useEffect(() => {
        setTotalPageCount(Math.ceil(pokemonCount / limit));
    }, [pokemonCount, limit])

    return (
        <div className="pagination">
            <div key={-1} >
                <button
                    onClick={(e) => setPage(0)}
                    className={`pagination-button ${active === 0? 'active' : ''}`}
                >
                    {'<<'}
                </button>
            </div>

            {                
                pageList.map((page: number) => (
                    <div key={page}>
                        <button
                            onClick={(e) => setPage(page)}
                            className={`pagination-button ${active === page? 'active' : ''}`}
                        >
                            { page + 1 }
                        </button>
                    </div>
                ))
            }

            <div key={totalPageCount}>
                <button
                    onClick={(e) => setPage(totalPageCount - 1)}
                    className={`pagination-button ${active === totalPageCount - 1? 'active' : ''}`}
                >{'>>'}</button>
            </div>
        </div>
    )
}