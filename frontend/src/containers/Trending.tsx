import { useState, useEffect } from "react";
import { Layout } from "../hocs/Layout";
import { Typography } from "@mui/material";
import { PersonCard, Person } from "../components/PersonCard";
import { Movie, MovieCard } from "../components/MovieCard";
import { JsonResponse, MediaGrid } from "../components/MediaGrid";
import Grid from "@mui/material/Grid";

export const Trending = () => {
  const [movieList, setMovieList] = useState<JsonResponse>();
  const [peopleList, setPeopleList] = useState<JsonResponse>();
  const [tvList, setTvList] = useState<JsonResponse>();

  const issueNewResearchQuery = async () => {
    const resMovies = await fetch(`/imdb/trending/movie/`);
    const resTV = await fetch(`/imdb/trending/tv/`);
    const resPeople = await fetch(`/imdb/trending/person/`);

    const movieData = await resMovies.json();
    const tvData = await resTV.json();
    const peopleData = await resPeople.json();

    setMovieList(movieData);
    setTvList(tvData);
    setPeopleList(peopleData);
  };
  useEffect(() => {
    issueNewResearchQuery();
  }, []);

  return (
    <Layout>
      <Grid container alignItems="center" columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid>
          <Typography variant="h2" align="center">
            Trending Movies
          </Typography>
          {typeof movieList != "undefined" && (
            <MediaGrid
              results={movieList?.results!}
              total_results={movieList?.total_results!}
            />
          )}
          <Typography variant="h2" align="center">
            Trending TV Shows
          </Typography>
          {typeof tvList != "undefined" && (
            <MediaGrid
              results={tvList?.results!}
              total_results={tvList?.total_results!}
            />
          )}
          <Typography variant="h2" align="center">
            Trending People
          </Typography>
          {typeof peopleList != "undefined" && (
            <MediaGrid
              results={peopleList?.results!}
              total_results={peopleList?.total_results!}
            />
          )}
        </Grid>
      </Grid>
    </Layout>
  );
};
