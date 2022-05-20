import { json } from "node:stream/consumers";
import React, { useState, useEffect } from "react";

export interface Movie {
  id: number;
  original_title: string;
  release_date: string;
  poster_path: string;
}

export interface JsonResponse {
  page: number;
  results: Array<Movie>;
  total_results: number;
}

export const Test = () => {
  const [results, setResults] = useState<JsonResponse>();

  useEffect(() => {
    fetch(`/imdb/search/movie/inception/`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setResults(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <p>
      {results?.results.map((element) => (
        <div>
          <h1>{element.original_title}</h1>
          <img
            src={`https://image.tmdb.org/t/p/original/${element.poster_path}`}
          />
        </div>
      ))}
    </p>
  );
};
