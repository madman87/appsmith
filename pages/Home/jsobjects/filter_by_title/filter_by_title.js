export default {
  async getTable() {
    try {
      // Ensure search_title.text is defined, and use an empty string if it is not
      const searchText = search_title?.text?.toLowerCase() || '';

      // Early return if searchText is empty; trigger read_db
      if (!searchText) {
        console.log("searchText is empty; triggering read db");
        await Select_public_app1.run();
        return;
      }

      // Ensure Table1.tableData exists and is an array; default to an empty array if not
      const tableData = Array.isArray(Table1.tableData) ? Table1.tableData : [];
      
      // Filter Table1.tableData based on the search text
      const filteredData = tableData.filter(item =>
        item.title?.toLowerCase().includes(searchText)
      );

      // Log the filtered data to the console
      console.log("Filtered Data:", filteredData);

      // Update Table1 with the filtered data
      Table1.setData(filteredData);


      return filteredData;
    } catch (error) {
      // Log a more descriptive error message
      console.error("Error in getTable function:", error);
    }
  }
};
