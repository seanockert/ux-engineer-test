import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Loading from "./Loading";
import ShowDate from "./ShowDate";
import { contentString } from "../contentString.js";

dayjs.extend(relativeTime);

export interface IShow {
  code?: number;
  id: string;
  name: string;
  summary: string;
  image: {
    original: string;
    medium: string;
  };
  genres: string[];
  premiered: string;
  _embedded: {
    cast: Array<ICastMember>;
    seasons: Array<ISeason>;
  };
}

export interface ICastMember {
  person: {
    name: string;
    image: {
      medium: string;
    };
  };
  character: {
    name: string;
  };
}

export interface ISeason {
  id: string;
  premiereDate: string;
  summary: string;
  image: {
    original: string;
    medium: string;
  };
}

interface IShowView {
  showId?: string;
  query: string;
}

const API_URL = process.env.REACT_APP_API_URL;

const ShowView: React.FC<IShowView> = ({ showId, query }) => {
  const [show, setShow] = useState<IShow | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (showId) {
      fetch(`${API_URL}shows/${showId}?embed[]=cast&embed[]=seasons`)
        .then((r: Response) => r.json())
        .then((json: IShow) => {
          setIsLoading(false);
          if (json.code === 0) {
            setError(contentString.showNotFound);
          }

          setShow(json);
        })
        .catch(() => {
          setIsLoading(false);
          setError(contentString.cannotLoadShowDetails);
        });
    } else {
      setError(contentString.cannotLoadShowDetails);
    }
  }, [showId]);

  return (
    <div className="stack-2x">
      <Loading isLoading={isLoading} loadingMsg={contentString.loadingShow}>
        <>
          {error ? (
            <div className="notice-container flex">
              <div className="stack">
                <svg height="32" viewBox="0 0 640 512">
                  <path
                    fill="currentColor"
                    d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7l-86.4-67.7 13.8 9.2c9.8 6.5 22.4 7.2 32.9 1.6s16.9-16.4 16.9-28.2V128c0-11.8-6.5-22.6-16.9-28.2s-23-5-32.9 1.6l-96 64L448 174.9V192 320v5.8l-32-25.1V128c0-35.3-28.7-64-64-64H113.9L38.8 5.1zM32 128V384c0 35.3 28.7 64 64 64H352c23.4 0 43.9-12.6 55-31.3L32.3 121.5c-.2 2.1-.3 4.3-.3 6.5z"
                  />
                </svg>
                <div>{error}</div>
              </div>
            </div>
          ) : show ? (
            <>
              <div className="show grid-half">
                <header className="show-header">
                  <Link href={`/?search=${query}`} title={contentString.backToListing} className="text-small">
                    &larr; {contentString.backToListing}
                  </Link>
                  <h2>{show.name}</h2>
                  {show.premiered ? (
                    <ShowDate date={show.premiered} />
                  ) : (
                    <div className="callout">{contentString.unknownPremier}</div>
                  )}
                </header>
                <section className="stack show-details">
                  <div dangerouslySetInnerHTML={{ __html: show.summary }} />

                  {show._embedded?.cast && show._embedded?.cast.length > 0 ? (
                    <>
                      <h3>Cast</h3>
                      <ul className="cast inline-grid">
                        {show._embedded.cast.map((member: ICastMember) => (
                          <li key={member.character.name}>
                            {member.person.image ? (
                              <img
                                src={member.person.image.medium}
                                width="210"
                                height="295"
                                alt=""
                                className="rounded-image"
                                loading="lazy"
                              />
                            ) : (
                              <div className="placeholder-image"></div>
                            )}
                            <div className="stack">
                              <h4>{member.person.name}</h4>
                              <small>{member.character.name}</small>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : null}
                </section>

                {show.image ? (
                  <figure className="show-image">
                    <img
                      src={show.image.original}
                      height="1365"
                      width="921"
                      alt={`Cover of ${show.name}`}
                      className="rounded-image"
                      style={{ backgroundImage: `url(${show.image.medium})` }}
                    />
                  </figure>
                ) : null}
              </div>

              {show._embedded?.seasons ? (
                <section className="show-seasons">
                  <h3>{`${show._embedded.seasons.length} ${
                    show._embedded.seasons.length === 1 ? contentString.season : contentString.seasons
                  }`}</h3>
                  <ol className="scroll-container">
                    {show._embedded.seasons.map((season: ISeason, index) => (
                      <li className="stack" key={season.premiereDate}>
                        {season.image || show.image ? (
                          <img
                            src={season.image ? season.image.medium : show.image.medium}
                            height="295"
                            width="210"
                            alt={`Poster for Season ${index + 1}`}
                            className="rounded-image"
                            loading="lazy"
                          />
                        ) : null}

                        <div>
                          <h4>{`${contentString.season} ${index + 1}`}</h4>
                          {season.premiereDate ? <ShowDate date={season.premiereDate} isSimple={true} /> : null}
                        </div>
                      </li>
                    ))}
                  </ol>
                </section>
              ) : null}
            </>
          ) : null}
        </>
      </Loading>
    </div>
  );
};

export default ShowView;
