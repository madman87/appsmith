export default {
    transform: async () => {
        try {
            const filesData = FilePicker1.files[0].data;

            // Ensure filesData is an array
            if (!Array.isArray(filesData)) {
                throw new Error("Invalid data format: filesData should be an array");
            }

            // Process data concurrently
            const processedData = await Promise.all(filesData.map(async (u) => {
                // Process object properties
                const processedObject = Object.fromEntries(
                    Object.entries(u).map(([key, value]) => {
                        if (typeof value === 'string') {
                            value = value.replace(/'/g, '');

                            // Date validation and formatting
                            if (moment(value, 'DD/MM/YYYY', true).isValid()) {
                                value = moment(value, 'DD/MM/YYYY').format('YYYY-MM-DD');
                            }
                        }
                        return [key, value];
                    })
                );

                // Insert data with error handling
                try {
                    await insert_data.run(processedObject);
                    console.log("Successfully inserted", processedObject);
                } catch (e) {
									// showAlert(`insertError for ${processedObject}`, insertError)
                    console.error("Insert failed for:", processedObject, e);
                    //throw insertError; // Throw error to exit if insert fails
                }

                return processedObject;
            }));

            // Execute read db after processing all inserts
					try{
            await Select_public_app1.run();
            showAlert("Upload finished!");
						
					}catch(e){
						console.log("test",e)
						await read_db.data
					}

            return processedData;

        } catch (e) {
            console.error("Error in transform function:", e);
            showAlert("An error occurred during upload.", "error");
						await Select_public_app1.run();
            return [];
        }
    }
};
