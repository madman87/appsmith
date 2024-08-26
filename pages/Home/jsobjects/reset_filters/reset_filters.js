export default {
  async reset() {
    // Disabling other filter searches
    search_title.setValue(""); // Clear search title
    sel_lang.setSelectedOption(''); // Clear selected language
    MultiSelect1.setSelectedOptions([]); // Clear selected options (use an empty array for multi-select)
  }
};
