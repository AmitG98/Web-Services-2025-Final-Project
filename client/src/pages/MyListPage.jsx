import React from "react";
import ProgramGridPage from "./ProgramGridPage";

const MyListPage = () => (
  <ProgramGridPage
    title="My List"
    query="myList"
    type="movie"
    activePage="my-list"
  />
);

export default MyListPage;
