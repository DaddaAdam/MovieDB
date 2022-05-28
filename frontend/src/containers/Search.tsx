import React, { useEffect, useState } from "react";
import { MediaGrid, JsonResponse } from "../components/MediaGrid";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export const Search = () => {
  const [results, setResults] = useState<JsonResponse>();
  const [textValue, setTextValue] = useState<string>("");
  const [selectValue, setSelectValue] = useState<string>("all");

  const issueNewResearchQuery = async () => {
    const res = await fetch(`/imdb/search/${selectValue}/${textValue}/`);

    const data = await res.json();

    setResults(data);
  };

  useEffect(() => {
    issueNewResearchQuery();
  }, [selectValue, textValue]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(e.target.value);
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    setSelectValue(e.target.value as string);
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
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectValue}
          label="Category"
          onChange={handleSelectChange}
        >
          <MenuItem value={"all"}>Any</MenuItem>
          <MenuItem value={"movie"}>Movie</MenuItem>
          <MenuItem value={"tv"}>TV Show</MenuItem>
          <MenuItem value={"person"}>People</MenuItem>
        </Select>
      </Grid>
      {(typeof results != "undefined" && results.total_results!) > 0 && (
        <MediaGrid
          results={results!.results}
          total_results={results!.total_results}
          media_type={selectValue}
        />
      )}
    </div>
  );
};
