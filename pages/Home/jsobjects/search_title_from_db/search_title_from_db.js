export default {
  async searchTitle() {
    try {
			
			//disabling other filter searches
			sel_lang.setSelectedOption('')
			MultiSelect1.setSelectedOptions("")
			
			console.log("searching db for title",search_title.text)
      await search_title_query.run()
			
      console.log("data",search_title_query.data);
			showAlert(`found ${search_title_query.data.length} matching results`)
			Table1.setData(search_title_query.data)
			
    } catch (error) {
      console.error("Error during searchTitle execution:", error);
    }
  }
};
