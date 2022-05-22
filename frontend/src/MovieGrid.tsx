import React from "react";
import { MovieCard, Movie } from "./MovieCard";
import Grid from "@mui/material/Grid";
import { PersonCard } from "./PersonCard";

export interface JsonResponse {
  results: Array<Movie>;
  total_results: number;
  media_type?: string;
}

export const MovieGrid = (props: JsonResponse) => {
  const isPerson = props.media_type === "person";
  const isAny: Boolean = Boolean(props.results[0].media_type);
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
              {isPerson || (isAny && element.media_type === "person") ? (
                element.known_for_department &&
                element.name &&
                element.profile_path ? (
                  <PersonCard
                    id={element.id}
                    known_for_department={element.known_for_department}
                    name={element.name}
                    profile_path={element.profile_path}
                  />
                ) : (
                  <div></div>
                )
              ) : (
                <MovieCard
                  id={element.id}
                  poster_path={element.poster_path}
                  original_title={element.original_title}
                  overview={element.overview}
                  release_date={element.release_date}
                />
              )}
            </Grid>
          ))}
      </Grid>
    </>
  );
};
