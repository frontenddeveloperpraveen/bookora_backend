const axios = require('axios');

(async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/books');
        console.log('Books fetched successfully:', response.data.length);
        if (response.data.length > 0) {
            console.log('First book:', response.data[0].title);
        } else {
            console.log('No books found. Seed script might have failed.');
        }
    } catch (error) {
        console.error('Error fetching books:', error.message);
    }
})();
