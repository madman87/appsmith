export default {
  async searchTitle() {
    try {
			console.log("searching db for title",search_title.text)
      await search_title_query.run();
			
			// if (search_title_query.isLoading){
				// console.log("query is loading")
			// }
			
      console.log("data",search_title_query.data);
			
    } catch (error) {
      console.error("Error during searchTitle execution:", error);
    }
  }
};
