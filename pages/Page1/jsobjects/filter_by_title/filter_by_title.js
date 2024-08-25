export default {
  async getTable() {
    try {
			
			await read_db.run()
      // Ensure Search_title.text is defined and use an empty string if it is not
      const searchText = search_title.text ? search_title.text.toLowerCase() : '';
			
      // Filter Table1.tableData based on the search text
      const filteredData = Table1.tableData.filter(item =>
        item.title.toLowerCase().includes(searchText)
      );

      // Log the filtered data to the console
      console.log(filteredData);

      // Update Table1 with the filtered data
      Table1.setData(filteredData);

      // Return the filtered data

			// if (Search_title.text.length===0) {
				// console.log("sss")
				// read_db.run()
			// }
      return filteredData;
    } catch (error) {
      // Log a more descriptive error message
      console.error("An error occurred while getting the table data:", error.message);
    }
  }
};
