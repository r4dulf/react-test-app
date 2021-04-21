import React, { useState } from "react";
import "./SearchBar.scss";

export function SearchBar(props: { updateQuery: (q: string) => void }) {
  const { updateQuery } = props;
  const [query, setNewQuery] = useState("");

  return (
    <div className="search-bar">
      <form
        method="GET"
        action="search"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();

          const data = new FormData(e.target as HTMLFormElement);
          const result = data.get("query") as string;

          updateQuery(result);
        }}
      >
        <input
          type="text"
          placeholder="Search"
          name="query"
          value={query}
          onChange={(e) => {
            setNewQuery(e.target.value);
          }}
        />
        <input
          type="button"
          name="clear"
          value="Clear query"
          onClick={() => {
            setNewQuery("");
            updateQuery("");
          }}
        />
        <input type="submit" hidden={true} />
      </form>
    </div>
  );
}
