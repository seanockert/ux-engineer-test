import React, { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { contentString } from "../contentString.js";

interface ISearch {
  query: string;
  submitSearch: (query: string) => void;
}

const Search: React.FC<ISearch> = ({ query, submitSearch }) => {
  const [localQuery, setLocalQuery] = useState("");

  function onSearch(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    submitSearch(localQuery);
  }

  const debounced = useDebouncedCallback((value) => {
    const urlWithParams = `${window.location.origin}?search=${value}`;
    window.history.pushState({ path: encodeURIComponent(urlWithParams) }, "", urlWithParams);

    setLocalQuery(value);
    submitSearch(value);
  }, 400);

  return (
    <form className="search flex" onSubmit={onSearch}>
      <label htmlFor="search-input" hidden>
        {contentString.searchLabel}
      </label>
      <input
        autoFocus
        defaultValue={query}
        onChange={(e) => debounced(e.target.value)}
        placeholder={contentString.searchLabel}
        id="search-input"
      />
      <button type="button" aria-label="Search">
        <svg height="28" viewBox="0 0 512 512">
          <path
            fill="currentColor"
            d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
          />
        </svg>
      </button>
    </form>
  );
};

export default Search;
