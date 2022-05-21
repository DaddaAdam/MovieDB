import React, { useEffect, useState } from "react";
import { MovieGrid, JsonResponse } from "./MovieGrid";

export const Search = () => {
  const [results, setResults] = useState<JsonResponse>();

  useEffect(() => {
    fetch(`/imdb/search/movie/Superman/`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setResults(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (typeof results != "undefined")
    return (
      <div>
        <MovieGrid
          results={results!.results}
          total_results={results!.total_results}
        />
      </div>
    );

  return <h1>Non defini</h1>;
};
