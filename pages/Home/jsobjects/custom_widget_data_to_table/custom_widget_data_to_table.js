export default {
  async Custom1onchange() {
    try {
			//disabling other filter searches
			search_title.setValue("")
			sel_lang.setSelectedOption('')
			MultiSelect1.setSelectedOptions("")
      
      // You might have some asynchronous operations here
      // For example, if fetching data or performing some async tasks
      // const result = await someAsyncFunction();
      
			await Table1.setData(Custom1.model.filteredata);

      return Custom1.model.filteredata;
    } catch (error) {
      // Handle errors if necessary
      console.error('Error in Custom1onchange:', error);
    }
  }
}
