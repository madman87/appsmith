export default {
  async getTable() {
    try {
      // Disable other filter searches
      search_title.setValue("");
      sel_lang.setSelectedOption("");

      // Wait until loading is finished
      while (search_db_for_genres.isLoading) {
        console.log("loading...");
        // Pause the loop for a short time before checking again
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      // Once loading is finished, proceed with running the search
      await search_db_for_genres.run();

      // Convert selected option values to lowercase for case-insensitive comparison
      const searchText = MultiSelect1.selectedOptionValues.map(option => option.toLowerCase());
      console.log("selectedOptionValues", searchText);

      // Filter Table1.tableData based on the "all" condition
      const filteredData = search_db_for_genres.data.filter(item => {
        // Convert item genres to lowercase for case-insensitive comparison
        const itemGenres = item.genres.toLowerCase();

        // "All" mode: Return items that contain all selected genres
        return searchText.every(text => itemGenres.includes(text));
      });

      // Log the filtered data to the console
      console.log(filteredData);
      showAlert(`found ${filteredData.length} matching result/s`);

      // Update Table1 with the filtered data
      Table1.setData(filteredData);

      // Return the filtered data
      return filteredData;
    } catch (error) {
      // Log a more descriptive error message
      console.error("An error occurred in getTable function:", error.message);
    }
  }
};
