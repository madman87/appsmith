export default {
    transform: async () => {
        let processedData = [];

        try {
            const filesData = FilePicker1.files[0].data;

            // Ensure filesData is an array
            if (!Array.isArray(filesData)) {
                throw new Error("Invalid data format: filesData should be an array");
            }

            const totalItems = filesData.length;
            const batchSize = Math.min(totalItems, 500); // Set max batch size to 500
            let batchData = [];
            let lastAlert = 0; // To track the last percentage alert shown

            // Determine if alerts should be shown every 5%
            const showDetailedAlerts = totalItems > 5000; // true or false 

            for (let i = 0; i < totalItems; i++) {
                // Process object properties
                const processedObject = Object.fromEntries(
                    Object.entries(filesData[i]).map(([key, value]) => {
                        if (typeof value === 'string') {
                            value = value.replace(/'/g, ''); //regex to replace single quotes with empty string

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

                // Calculate progress percentage
                const progress = Math.floor(((i + 1) / totalItems) * 100);

                // Show alert for every 10% of progress if file has 5000 items or fewer
                // Show alert for every 5% of progress if file has more than 5000 items
                if ((showDetailedAlerts && progress >= lastAlert + 5) || (!showDetailedAlerts && progress >= lastAlert + 10)) {
                    showAlert(`${progress}% of the file processed`);
                    lastAlert = progress;
                }

                // If batchData has reached the batchSize or if it's the last iteration
                if (batchData.length === batchSize || i === totalItems - 1) {
                    try {
                        // Insert data in bulk
                        console.log("processing...", batchData);
                        await insert_multiple_rows_at_once.run({ batchData });
                    } catch (e) {
                        console.error("Batch insert failed for:", batchData, e);
                    }

                    // Store the processed batch and reset batchData
                    processedData.push(...batchData);
                    batchData = [];
                }
            }

            // Execute read db after processing all inserts
            await Select_public_app1.run();
            showAlert("Upload finished!");

        } catch (e) {
            console.error("Error in transform function:", e);
            showAlert("An error occurred during upload.", "error");
        } finally {
            // Ensure read_db.run() is called at the very end
            try {
                await read_db.run();
            } catch (e) {
                console.error("Error running read_db:", e);
            }
        }

        return processedData;
    }
};
