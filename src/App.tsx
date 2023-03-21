import React, { useEffect } from "react";
import { Route, Link } from "wouter";
import EmptyState from "./components/EmptyState";
import Loading from "./components/Loading";
import Search from "./components/Search";
import ShowsList from "./components/ShowsList";
import ShowView from "./components/ShowView";
import { contentString } from "./contentString.js";
import type { IShow } from "./components/ShowView";
import "./assets/styles.scss";

const API_URL = process.env.REACT_APP_API_URL;
const searchParam = new URLSearchParams(window.location.search).get("search")?.trim();

export default function App(): JSX.Element {
  const [query, setQuery] = React.useState<string>(searchParam ?? "");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  const [hasSearched, setHasSearched] = React.useState<boolean>(false);
  const [shows, setShows] = React.useState<Array<IShow>>([]);

  function submitSearch(query: string) {
    setHasSearched(false);
    setQuery(query);
    setIsLoading(true);
    setShows([]);
    setError("");

    fetch(`${API_URL}search/shows?q=${query}`)
      .then((r: Response) => r.json())
      .then((json: Array<{ show: IShow }>) => {
        setHasSearched(true);
        setIsLoading(false);
        setShows(json.map((r) => r.show));
      })
      .catch(() => {
        setIsLoading(false);
        setError(contentString.cannotLoadShows);
      });
  }

  useEffect(() => {
    if (query) {
      submitSearch(query);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="app stack-2x">
      <header className="flex">
        <h1>
          <Link className="flex" href="/" title={contentString.backToListing}>
            <svg height="32" viewBox="0 0 512 512">
              <path
                fill="currentColor"
                d="M169 7c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l55 55H80C35.8 96 0 131.8 0 176V432c0 44.2 35.8 80 80 80H432c44.2 0 80-35.8 80-80V176c0-44.2-35.8-80-80-80H321.9l55-55c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-87 87L169 7zM424 232a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm24 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48zM64 224c0-35.3 28.7-64 64-64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H128c-35.3 0-64-28.7-64-64V224z"
              />
            </svg>{" "}
            TV Database
          </Link>
        </h1>
        <Search query={query} submitSearch={submitSearch} />
      </header>

      <Route path="/show/:showId">{(params) => <ShowView showId={params.showId} query={query} />}</Route>

      <Route path="/">
        {error ? (
          <div className="notice-container flex">
            <div className="callout error">{error}</div>
          </div>
        ) : (
          <Loading isLoading={isLoading} loadingMsg={contentString.loadingShows}>
              {hasSearched && query ? (
                shows.length > 0 ? (
                  <ShowsList shows={shows} query={query} />
                ) : (
                  <EmptyState />
                )
              ) : (
                <div className="notice-container flex">
                  <div className="stack">
                    <svg height="48" viewBox="0 0 512 512">
                      <path
                        fill="currentColor"
                        d="M169 7c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l55 55H80C35.8 96 0 131.8 0 176V432c0 44.2 35.8 80 80 80H432c44.2 0 80-35.8 80-80V176c0-44.2-35.8-80-80-80H321.9l55-55c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-87 87L169 7zM424 232a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm24 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48zM64 224c0-35.3 28.7-64 64-64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H128c-35.3 0-64-28.7-64-64V224z"
                      />
                    </svg>
                    <div>{contentString.noShows}</div>
                  </div>
                </div>
              )}
          </Loading>
        )}
      </Route>
    </main>
  );
}

// function Loading({ isLoading, children }: { isLoading: boolean; children: React.ReactChild }): JSX.Element {
//   return isLoading ? (
//     <div className="notice-container flex">
//       <div>
//         <svg width="24" height="24" viewBox="0 0 24 24">
//           <path
//             fill="currentColor"
//             d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
//             className="spinner"
//           />
//         </svg>
//         {contentString.loadingShows}
//       </div>
//     </div>
//   ) : (
//     <>{children}</>
//   );
// }
