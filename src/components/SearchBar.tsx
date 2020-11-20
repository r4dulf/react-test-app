import React from 'react';

export function SearchBar(props: { setQuery: (q: string) => void }) {
    const { setQuery } = props;

    return (
        <div className="search-bar">
            <form method="GET" action="search" onSubmit={
                (e: React.FormEvent<HTMLFormElement>) => {
                    e.preventDefault()

                    const data = new FormData(e.target as HTMLFormElement);
                    const result = data.get('query') as string;

                    setQuery(result)
                }}>

                <input type="text" placeholder="Search (>3 characters)" name="query"/>
                <input type="submit" hidden={true}/>
            </form>
        </div>
    )
}