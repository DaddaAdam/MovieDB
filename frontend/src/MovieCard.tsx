import React from "react";
import Card from "@mui/material/Card";

import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export interface Movie {
  id: number;
  original_title: string;
  release_date: string;
  poster_path: string;
  overview: string;
}

export const MovieCard = ({
  id,
  original_title,
  poster_path,
  overview,
  release_date,
}: Movie) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt={original_title}
        image={`https://image.tmdb.org/t/p/original${poster_path}`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {original_title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {overview.substring(0, 170) + "..."}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};
