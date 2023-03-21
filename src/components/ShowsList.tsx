import React from "react";
import { contentString } from "../contentString";
import ShowPreview from "./ShowPreview";
import type { IShow } from "./ShowView";

interface IShowsList {
  shows: Array<IShow>;
  query: string;
}

const ShowsList: React.FC<IShowsList> = ({ shows, query }) => {
  return (
    <>
      <h2>
        {shows.length} {contentString.matchingShows} "{query}"
      </h2>
      <ul className="show-list grid">
        {shows.map((show, index) => {
          return (
            <li key={show.id} style={{ animationDelay: `${index * 0.07}s` }}>
              <ShowPreview id={show.id} name={show.name} image={show.image ? show.image.medium : undefined} />
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ShowsList;
