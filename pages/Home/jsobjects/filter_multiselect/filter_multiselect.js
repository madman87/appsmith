export default {
  async filter() {
    try {
      // Disable other filter searches
      search_title.setValue("");
      sel_lang.setSelectedOption("");
			
			const genres = `^(?=.*${MultiSelect1.selectedOptionValues.join(')(?=.*')}).*`;

			console.log(genres)
			
      await search_db_for_genres.run({"data":genres}); //takes dict 

      const filteredData = search_db_for_genres.data

      console.log("filteredData",filteredData);
      showAlert(`found ${filteredData.length} matching result/s`);

      // Update Table1 with the filtered data
      Table1.setData(filteredData);

      return filteredData;
			
    } catch (error) {
      // Log a more descriptive error message
      console.error("An error occurred in filter_multiselect function:", error.message);
    }
  }
};
