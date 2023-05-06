const useGenerateSearchParams = (searchQuery , selectedGenre ='All', sortBy, searchByType) => {

  let params = {};

  if (selectedGenre === "All") {
    params = {
      search: "",
      searchBy: "title",
      sortBy: sortBy,
      activeGenre: selectedGenre
    }
      
  } else {
    params = {
      search: selectedGenre,
      searchBy: "genres",
      sortBy: sortBy,
      activeGenre: selectedGenre
    }
      
  }
  return [params];
}

export default useGenerateSearchParams;