export default {
  async filter_by_lang() {
    try {
      // Disable other filter searches
      search_title.setValue("");
      MultiSelect1.setSelectedOptions("");

      // Run the database search operation
      await search_by_movie_language.run();
			
			const filteredData = search_by_movie_language.data
      // Alert the user with the count of matching results
      showAlert(`Found ${filteredData.length} matching result(s)`);

      // Update Table1 with the filtered data
      Table1.setData(filteredData);

      // Return the filtered data
      return filteredData;
    } catch (error) {
      // Provide a more descriptive error message
      console.error("Error while fetching table data:", error);
    }
  }
};
