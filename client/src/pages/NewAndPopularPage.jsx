import React from "react";
import ProgramGridPage from "./ProgramGridPage";

const NewAndPopularPage = () => (
  <ProgramGridPage
    title="New & Popular"
    query="newAndPopular"
    type="movie"
    activePage="new&popular"
  />
);

export default NewAndPopularPage;
