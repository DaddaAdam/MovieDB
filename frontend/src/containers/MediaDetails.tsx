import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "../hocs/Layout";
import { PersonCard } from "../components/PersonCard";
import { MovieCard } from "../components/MovieCard";

export interface Response {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: BelongsToCollection;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: OriginalLanguage;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: Date;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  videos: Videos;
  credits: Credits;
  recommendations: Recommendations;
}

export interface BelongsToCollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
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
  cast_id?: number;
  character?: string;
  credit_id: string;
  order?: number;
  department?: Department;
  job?: string;
}

export enum Department {
  Acting = "Acting",
  Art = "Art",
  Camera = "Camera",
  CostumeMakeUp = "Costume & Make-Up",
  Crew = "Crew",
  Directing = "Directing",
  Editing = "Editing",
  Lighting = "Lighting",
  Production = "Production",
  Sound = "Sound",
  VisualEffects = "Visual Effects",
  Writing = "Writing",
}

export interface Genre {
  id: number;
  name: string;
}

export enum OriginalLanguage {
  En = "en",
}

export interface ProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: OriginCountry;
}

export enum OriginCountry {
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
  title: string;
  original_language: OriginalLanguage;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export enum MediaType {
  Movie = "movie",
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
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
  site: Site;
  size: number;
  type: Type;
  official: boolean;
  published_at: Date;
  id: string;
}

export enum Site {
  YouTube = "YouTube",
}

export enum Type {
  BehindTheScenes = "Behind the Scenes",
  Bloopers = "Bloopers",
  Clip = "Clip",
  Featurette = "Featurette",
  Teaser = "Teaser",
  Trailer = "Trailer",
}

export const MediaDetails = () => {
  const [results, setResults] = useState<Response>();
  let { id } = useParams();

  useEffect(() => {
    issueNewResearchQuery();
  }, []);

  const issueNewResearchQuery = async () => {
    const res = await fetch(`/imdb/details/${id}/movie/`);
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
            style={{
              maxWidth: "720px",
            }}
          />
        </Grid>
        <Grid item xs={7} justifyContent="flex-start" alignItems="flex-start">
          <Typography variant="h2">{results?.original_title!} </Typography>
          <Typography variant="body1">{results?.overview!}</Typography>
          <Typography variant="body1">
            <Typography variant="h4">Budget:</Typography>
            {Intl.NumberFormat("en-US").format(results?.budget!)} USD
          </Typography>
          <Typography variant="body1">
            <Typography variant="h4">Produced by:</Typography>
            {results?.production_companies[0].name!}
          </Typography>
          <Typography variant="body1">
            <Typography variant="h4">Release date:</Typography>
            {results?.release_date.toLocaleString()}
          </Typography>
          <Typography variant="body1">
            <Typography variant="h4">Score:</Typography>
            {results?.vote_average!}/10
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h3">Cast</Typography>
        </Grid>
        {results?.credits.cast
          .filter((element, idx) => idx < 10)
          .map((element) => {
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
                  name={element.name!}
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
          .map((element) => {
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
                  original_title={element.original_title!}
                  overview={element.overview!}
                  poster_path={element.poster_path!}
                  release_date={element.release_date.toLocaleString()!}
                  media_type="movie"
                />
              </Grid>
            );
          })}
      </Grid>
    </Layout>
  );
};
