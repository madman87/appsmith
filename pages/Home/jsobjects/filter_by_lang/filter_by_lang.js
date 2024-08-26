export default {
  async getTable() {
    try {
      // Run the database read operation
      await Select_public_app1.run();

      // Convert the selected language option to lowercase for case-insensitive comparison
      const searchText = sel_lang.selectedOptionValue.toLowerCase();
      console.log("Selected language:", searchText);

      // Filter Table1.tableData based on the selected language
      const filteredData = Table1.tableData.filter(item => {
        // Convert item spoken languages to lowercase for case-insensitive comparison
        const languages = item.spoken_languages.toLowerCase();

        // Check if the selected language is included in the item's spoken languages
        return languages.includes(searchText);
      });

      // Log the filtered data to the console
      console.log("Filtered data:", filteredData);

      // Update Table1 with the filtered data
      Table1.setData(filteredData);

      // Return the filtered data
      return filteredData;
    } catch (error) {
      // Log a more descriptive error message
      console.error("An error occurred while getting the table data:", error.message);
    }
  }
};
