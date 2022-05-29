import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "../hocs/Layout";
import { PersonCard } from "../components/PersonCard";
import { MovieCard } from "../components/MovieCard";
import { MediaGrid } from "../components/MediaGrid";

export interface Actor {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: Date;
  deathday: null;
  gender: number;
  homepage: null;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
  combined_credits: CombinedCredits;
}

export interface CombinedCredits {
  cast: Cast[];
  crew: Cast[];
}

export interface Cast {
  adult?: boolean;
  backdrop_path: null | string;
  title?: string;
  genre_ids: number[];
  original_language: OriginalLanguage;
  original_title?: string;
  poster_path: null | string;
  video?: boolean;
  vote_average: number;
  overview: string;
  release_date?: string;
  vote_count: number;
  id: number;
  popularity: number;
  character?: string;
  credit_id: string;
  order?: number;
  media_type: MediaType;
  original_name?: string;
  origin_country?: string[];
  first_air_date?: Date;
  name?: string;
  episode_count?: number;
  department?: string;
  job?: string;
}

export enum MediaType {
  Movie = "movie",
  Tv = "tv",
}

export enum OriginalLanguage {
  En = "en",
  Fr = "fr",
  Ga = "ga",
}

export const PersonDetails = () => {
  const [results, setResults] = useState<Actor>();
  let { id } = useParams();

  useEffect(() => {
    issueNewResearchQuery();
  }, []);

  const issueNewResearchQuery = async () => {
    const res = await fetch(`/imdb/details/person/${id}/`);
    const data = await res.json();
    setResults(data);
  };

  return (
    <Layout>
      <Grid container direction="row" alignItems="flex-start" spacing={-2}>
        <Grid item xs={5} alignItems="flex-start">
          <img
            src={`https://image.tmdb.org/t/p/original${results?.profile_path!}`}
            width="75%"
            style={{
              maxWidth: "500px",
            }}
          />
        </Grid>
        <Grid item xs={7} justifyContent="flex-start" alignItems="flex-start">
          <Typography variant="h2">{results?.name!}</Typography>
          <Typography variant="h4">About:</Typography>
          <Typography variant="subtitle1">{results?.biography!}</Typography>
          <Typography variant="h4">Known for:</Typography>
          <Typography variant="body1">
            {results?.known_for_department!}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h3">Credits: </Typography>
        </Grid>
        {results?.combined_credits.cast.map((element) => {
          return (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              sx={{ marginTop: "20px", marginRight: -20 }}
            >
              <MovieCard
                id={element.id!}
                media_type={element.media_type!}
                original_title={
                  element.media_type === "tv"
                    ? element.original_title!
                    : element.original_name!
                }
                overview={element.overview!}
                poster_path={element.poster_path!}
                release_date={
                  element?.media_type! === "tv"
                    ? typeof element?.first_air_date === "undefined"
                      ? "N/A"
                      : element?.first_air_date!.toLocaleString()
                    : element?.release_date!
                }
              />{" "}
            </Grid>
          );
        })}
      </Grid>
    </Layout>
  );
};
