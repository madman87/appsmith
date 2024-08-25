export default {
    transform: async () => {
      const filesData = FilePicker1.files[0].data;
				
        // Map and process the data concurrently
        const processedData = await Promise.all(filesData.map(async (u) => {
            // Create the processed object directly
            const processedObject = Object.fromEntries(
                Object.entries(u).map(([key, value]) => {
                    // Process string values
                    if (typeof value === 'string') {
                        // Remove single quotes
                        value = value.replace(/'/g, '');

                        // Check if it's a date in "dd/MM/yyyy" format and reformat if valid
                        if (moment(value, 'DD/MM/YYYY', true).isValid()) {
                            value = moment(value, 'DD/MM/YYYY').format('YYYY-MM-DD'); // ISO format
                        }
                    }

                    // Return the updated key-value pair
                    return [key, value];
                })
            );

            // Run insert_data for each processedObject
            return insert_data.run(processedObject).then(() => {
                console.log("Inserting", processedObject);
                return processedObject;
            });
        }));

        // Execute read_db after processing all inserts
        await Select_public_app1.run();
        showAlert("Upload finished!");

        return processedData;
    }
};
