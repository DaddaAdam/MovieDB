import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "../hocs/Layout";
import { PersonCard } from "../components/PersonCard";
import { MovieCard } from "../components/MovieCard";

export interface Response {
  adult: boolean;
  backdrop_path: string;
  created_by: CreatedBy[];
  episode_run_time: number[];
  first_air_date: Date;
  genres: Genre[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: OriginalLanguage[];
  last_air_date: Date;
  last_episode_to_air: TEpisodeToAir;
  name: string;
  next_episode_to_air: TEpisodeToAir;
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: OriginCountry[];
  original_language: OriginalLanguage;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Network[];
  production_countries: ProductionCountry[];
  seasons: Season[];
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
  videos: Videos;
  credits: Credits;
  recommendations: Recommendations;
}

export interface CreatedBy {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string;
}

export interface Credits {
  cast: Cast[];
  crew: Cast[];
}

export interface Cast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: Department;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: null | string;
  character?: string;
  credit_id: string;
  order?: number;
  department?: Department;
  job?: string;
}

export enum Department {
  Acting = "Acting",
  Art = "Art",
  Production = "Production",
  Sound = "Sound",
  Writing = "Writing",
}

export interface Genre {
  id: number;
  name: string;
}

export enum OriginalLanguage {
  De = "de",
  En = "en",
}

export interface TEpisodeToAir {
  air_date: Date;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  runtime: number;
  season_number: number;
  still_path: null | string;
  vote_average: number;
  vote_count: number;
}

export interface Network {
  name: string;
  id: number;
  logo_path: null | string;
  origin_country: string;
}

export enum OriginCountry {
  De = "DE",
  Gb = "GB",
  Us = "US",
}

export interface ProductionCountry {
  iso_3166_1: OriginCountry;
  name: string;
}

export interface Recommendations {
  page: number;
  results: RecommendationsResult[];
  total_pages: number;
  total_results: number;
}

export interface RecommendationsResult {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  media_type: MediaType;
  name: string;
  origin_country: OriginCountry[];
  original_language: OriginalLanguage;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date: Date;
  vote_average: number;
  vote_count: number;
}

export enum MediaType {
  Tv = "tv",
}

export interface Season {
  air_date: Date;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: OriginalLanguage;
  name: string;
}

export interface Videos {
  results: VideosResult[];
}

export interface VideosResult {
  iso_639_1: OriginalLanguage;
  iso_3166_1: OriginCountry;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: Date;
  id: string;
}

export const TvDetails = () => {
  const [results, setResults] = useState<Response>();
  let { id } = useParams();

  useEffect(() => {
    issueNewResearchQuery();
  }, []);

  const issueNewResearchQuery = async () => {
    const res = await fetch(`/imdb/details/${id}/tv/`);
    const data = await res.json();
    setResults(data);
  };

  return (
    <Layout>
      <Grid container direction="row" alignItems="flex-start" spacing={-2}>
        <Grid item xs={5} alignItems="flex-start">
          <img
            src={`https://image.tmdb.org/t/p/original${results?.poster_path!}`}
            width="75%"
            alt={
              typeof results?.original_name !== "undefined"
                ? results?.original_name!
                : "N/A"
            }
            style={{
              maxWidth: "500px",
            }}
          />
        </Grid>
        <Grid item xs={7} justifyContent="flex-start" alignItems="flex-start">
          <Typography variant="h2">
            {typeof results?.original_name !== "undefined"
              ? results?.original_name!
              : "N/A"}{" "}
          </Typography>
          <Typography variant="body1">{results?.overview!}</Typography>
          <Typography variant="body1">
            <Typography variant="h4">Produced by:</Typography>
            {typeof results?.production_companies[0] !== "undefined"
              ? results?.production_companies[0].name!
              : "N/A"}
          </Typography>
          <Typography variant="body1">
            <Typography variant="h4">Score:</Typography>
            {results?.vote_average!}/10
          </Typography>
          <Typography variant="body1">
            <Typography variant="h4">Number of seasons:</Typography>
            {results?.number_of_seasons!}
          </Typography>
          <Typography variant="body1">
            <Typography variant="h4">Number of episodes:</Typography>
            {results?.number_of_episodes!}
          </Typography>
          <Typography variant="body1">
            <Typography variant="h4">Started on:</Typography>
            {results?.first_air_date.toLocaleString()}
          </Typography>
          <Typography variant="body1">
            <Typography variant="h4">Last episode released on:</Typography>
            {results?.last_episode_to_air.air_date.toLocaleString()}
          </Typography>
          <Typography variant="body1">
            <Typography variant="h4">Status:</Typography>
            {results?.status!}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h3">Cast</Typography>
        </Grid>
        {results?.credits.cast
          .filter((element, idx) => idx < 10)
          .map(element => {
            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                sx={{ marginTop: "20px", marginRight: -20 }}
              >
                <PersonCard
                  id={element.id!}
                  known_for_department={element.known_for_department!}
                  name={element.name ? element.name : "N/A"}
                  profile_path={element.profile_path!}
                />
              </Grid>
            );
          })}
        <Grid item xs={12}>
          <Typography variant="h3">Similar titles you may like</Typography>
        </Grid>
        {results?.recommendations.results
          .filter((element, idx) => idx < 10)
          .map(element => {
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
                  original_title={element.original_name!}
                  overview={element.overview!}
                  poster_path={element.poster_path!}
                  release_date=""
                  media_type="tv"
                />
              </Grid>
            );
          })}
      </Grid>
    </Layout>
  );
};
