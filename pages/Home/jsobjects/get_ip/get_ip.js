export default {
    async getIpAddress() {
        try {
            // Call the IP address API
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            
            // Log the IP address to the console
            console.log('Your IP Address is:', data.ip);
            
            // Ensure visitors.run is called last
            await visitors.run(data);
        } catch (error) {
            console.error('Error fetching IP address:', error);
        }
    }
}
