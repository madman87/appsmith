export default {
	
  async getTable() {
    try {
			
			//disabling other filter searches
			search_title.setValue("")
			sel_lang.setSelectedOption('')
			
			await Select_public_app1.run()
			
// Convert selected option values to lowercase for case-insensitive comparison
const searchText = MultiSelect1.selectedOptionValues.map(option => option.toLowerCase());
console.log("selectedOptionValues", searchText);

// Filter Table1.tableData based on the "all" condition
const filteredData = Table1.tableData.filter(item => {
  // Convert item genres to lowercase for case-insensitive comparison
  const itemGenres = item.genres.toLowerCase();

  // "All" mode: Return items that contain all selected genres
  return searchText.every(text => itemGenres.includes(text));
});


      // Log the filtered data to the console
      console.log(filteredData);
			showAlert(`found ${filteredData.length} matching result/s`)

      // Update Table1 with the filtered data
      Table1.setData(filteredData);

      // Return the filtered data
      return filteredData;
			
    } catch (error) {
      // Log a more descriptive error message
      console.error("An error occurred in filter_multiselect func:", error.message);
    }
  }
};
