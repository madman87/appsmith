export default {
  async Custom1onchange() {
    try {
			//disabling other filter searches
			search_title.setValue("")
			sel_lang.setSelectedOption('')
			MultiSelect1.setSelectedOptions("")
			
      // Assuming `Custom1.model.filteredData` might involve asynchronous operations
      // If it's synchronous, you might not need async/await here
      await console.log(Custom1.model.data);
      
      // You might have some asynchronous operations here
      // For example, if fetching data or performing some async tasks
      // const result = await someAsyncFunction();
      
			Table1.setData(Custom1.model.data);

      return Custom1.model.data;
    } catch (error) {
      // Handle errors if necessary
      console.error('Error in Custom1onchange:', error);
    }
  }
}
