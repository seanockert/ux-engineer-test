import React from "react";
import { Link } from "wouter";
import { contentString } from "../contentString";

interface IShowPreview {
  id: string;
  name: string;
  image?: string;
  genres?: string[];
}

const ShowPreview: React.FC<IShowPreview> = ({ id, name, image, genres }) => {
  return (
    <Link href={`/show/${id}`} title={`${contentString.view} ${name}`}>
      <figure className="rounded-image">
        {image ? (
          <img src={image} height="295" width="210" alt={`${name} ${contentString.poster}`} loading="lazy" />
        ) : (
          <div className="placeholder-image"></div>
        )}
      </figure>
      <h3>{name}</h3>
      {/* {genres ? <ul className="inline-flex">{genres.map((g) => <li className="callout">{g}</li>)}</ul> : null} */}
    </Link>
  );
};

export default ShowPreview;
