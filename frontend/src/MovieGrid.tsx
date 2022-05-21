import React from "react";
import Grid from "@mui/material/Grid";
import { MovieCard, Movie } from "./MovieCard";

export interface JsonResponse {
  results: Array<Movie>;
  total_results: number;
}

export const MovieGrid = (props: JsonResponse) => {
  return (
    <Grid
      container
      spacing={10}
      justifyContent="space-between"
      direction="column"
      alignItems="center"
    >
      {props.results
        .filter((element, idx) => idx < props.results.length / 2)
        .map((element) => (
          <MovieCard
            id={element.id}
            poster_path={element.poster_path}
            original_title={element.original_title}
            overview={element.overview}
            release_date={element.release_date}
          />
        ))}
    </Grid>
  );
};
