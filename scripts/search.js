new Vue({
    el: '#app',
    data: {
        searchQuery: '',
        location: {},
        current: {},
        loading: false,
        error: ''
    },
    methods: {
        async searchLocation() {
            // Clear previous results
            this.location = {};
            this.error = '';
            this.loading = true;
            /* const options = {
                 method: 'GET',
                 url: 'https://weatherapi-com.p.rapidapi.com/current.json',
                 params: {q: this.searchQuery},
                 headers: {
                     'X-RapidAPI-Key': '76ce2ab572msh807526332335cc3p1f5d2fjsn1ed656ea6e05',
                     'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
                 }
             };*/
            // const axios = require('axios');

            const options = {
                method: 'GET',
                url: 'https://weatherapi-com.p.rapidapi.com/current.json',
                params: {q: this.searchQuery},
                headers: {
                    'X-RapidAPI-Key': '76ce2ab572msh807526332335cc3p1f5d2fjsn1ed656ea6e05',
                    'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
                }
            };

            try {
                const response = await axios.request(options);
                console.log(response.data);
                this.location = response.data.location;
                this.current = response.data.current;
            } catch (error) {
                console.error(error);
                this.error = error.message;
            } finally {
                this.loading = false;
            }
            // Make Axios call to fetch data from the API
            /* axios.get(options.url,options.params,options.headers)
                 .then(response => {
                     // Update locations with the retrieved data
                     this.location = response.data;
                 })
                 .catch(error => {
                     // Handle errors
                     this.error = error.message;
                 })
                 .finally(() => {
                     this.loading = false;
                 });*/
        }
    }
});

/*
const options = {
    method: 'GET',
    url: 'https://weatherapi-com.p.rapidapi.com/current.json',
    params: {q: '53.1,-0.13'},
    headers: {
        'X-RapidAPI-Key': '76ce2ab572msh807526332335cc3p1f5d2fjsn1ed656ea6e05',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
};

try {
    const response = await axios.request(options);
    console.log(response.data);
} catch (error) {
    console.error(error);
}*/
