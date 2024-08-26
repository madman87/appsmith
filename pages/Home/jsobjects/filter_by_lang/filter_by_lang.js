export default {
  async getTable() {
    try {
      // Disable other filter searches
      search_title.setValue("");
      MultiSelect1.setSelectedOptions("");

      // Run the database search operation
      await search_by_movie_language.run();

      // Ensure a valid language is selected before proceeding
      const selectedLanguage = sel_lang.selectedOptionValue.toLowerCase();
      if (!selectedLanguage) {
				Select_public_app1.run()
        showAlert("Please select a language.", "warning");
        return;
      }
      // Filter movie data based on the selected language
      const filteredData = search_by_movie_language.data.filter(item => {
        // Ensure spoken_languages is available and convert to lowercase
        const languages = item.spoken_languages?.toLowerCase() || "";
        return languages.includes(selectedLanguage);
      });

      // Alert the user with the count of matching results
      showAlert(`Found ${filteredData.length} matching result(s)`);

      // Update Table1 with the filtered data
      Table1.setData(filteredData);

      // Return the filtered data
      return filteredData;
    } catch (error) {
      // Provide a more descriptive error message
      console.error("Error while fetching table data:", error);
    }
  }
};
