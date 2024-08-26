export default {
    transform: async () => {
        try {
            const filesData = FilePicker1.files[0].data;

            // Ensure filesData is an array
            if (!Array.isArray(filesData)) {
                throw new Error("Invalid data format: filesData should be an array");
            }

            const processedData = [];
            let batchData = [];

            for (let i = 0; i < filesData.length; i++) {
                // Process object properties
                const processedObject = Object.fromEntries(
                    Object.entries(filesData[i]).map(([key, value]) => {
                        if (typeof value === 'string') {
                            value = value.replace(/'/g, '');

                            // Date validation and formatting
                            if (moment(value, 'DD/MM/YYYY', true).isValid()) {
                                value = moment(value, 'DD/MM/YYYY').format('YYYY-MM-DD');
                            } else if (value.trim() === '') {
                                // Set empty date to today's date
                                value = moment().format('YYYY-MM-DD');
                            }
                        }
                        return [key, value];
                    })
                );

                batchData.push(processedObject);

                // If batchData has 500 items or if it's the last iteration
                if (batchData.length === 500 || i === filesData.length - 1) {
                    try {
                        // Insert data in bulk
                        console.log("batchData", batchData);
                        await insert_multiple_rows_at_once.run({ batchData });
                        console.log("Successfully inserted batch", batchData);
                    } catch (e) {
                        console.error("Batch insert failed for:", batchData, e);
                        showAlert(`Batch insert failed: ${e.message}`);
                    }

                    // Store the processed batch and reset batchData
                    processedData.push(...batchData);
                    batchData = [];
                }
            }

            // Execute read db after processing all inserts
            try {
                await Select_public_app1.run();
                showAlert("Upload finished!");
            } catch (e) {
                console.error("Error while reading from the database:", e);
                await read_db.data;
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
