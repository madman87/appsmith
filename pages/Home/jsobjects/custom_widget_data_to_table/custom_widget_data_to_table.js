export default {
	Custom1onchange() {
		try {
			// Reset filter fields
			search_title.setValue("");
			sel_lang.setSelectedOption('');
			MultiSelect1.setSelectedOptions([]);

			// Update table data with filtered data
			Table1.setData(Custom1.model.filteredata);

			return Custom1.model.filteredata

		} catch (error) {
			console.error('Error in Custom1onchange:', error);
		}
	}
}
