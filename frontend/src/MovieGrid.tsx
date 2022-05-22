import React, { useState } from "react";
import { MovieCard, Movie } from "./MovieCard";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

export interface JsonResponse {
  results: Array<Movie>;
  total_results: number;
}

export const MovieGrid = (props: JsonResponse) => {
  const [textValue, setTextValue] = useState<string>("");
  return (
    <>
      <Grid
        container
        spacing={10}
        justifyContent="space-evenly"
        alignItems="center"
      >
        {props.results
          .filter((element, idx) => idx < props.results.length / 2)
          .map((element) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              sx={{ marginTop: "20px", marginRight: -6 }}
            >
              <MovieCard
                id={element.id}
                poster_path={element.poster_path}
                original_title={element.original_title}
                overview={element.overview}
                release_date={element.release_date}
              />
            </Grid>
          ))}
      </Grid>
    </>
  );
};
