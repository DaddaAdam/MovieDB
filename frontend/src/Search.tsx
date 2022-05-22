import React, { useEffect, useState } from "react";
import { MovieGrid, JsonResponse } from "./MovieGrid";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

export const Search = () => {
  const [results, setResults] = useState<JsonResponse>();

  const [textValue, setTextValue] = useState<string>("");

  const issueNewResearchQuery = async () => {
    const res = await fetch(`/imdb/search/movie/${textValue}/`);

    const data = await res.json();

    setResults(data);
  };

  useEffect(() => {
    issueNewResearchQuery();
  }, []);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(e.target.value);

    setTimeout(issueNewResearchQuery, 500);
  };

  return (
    <div>
      <Grid container justifyContent="space-evenly" alignItems="center">
        <TextField
          value={textValue}
          fullWidth
          onChange={handleTextChange}
          label="Rechercher"
          id="fullWidth"
          sx={{ m: 2 }}
        />
      </Grid>
      {typeof results != "undefined" && (
        <MovieGrid
          results={results!.results}
          total_results={results!.total_results}
        />
      )}
    </div>
  );
};
