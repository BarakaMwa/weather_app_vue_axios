new Vue({
    el: '#app',
    data: {
        active: 'active',
        searchQuery: '',
        location: {},
        current: {},
        loading: false,
        error: '',
        daysForecast: 3,
        foreCastDays: [],
        userLocation: null,
        storedLocation: null,
        foreCastDay: {}

    }, created() {
        // Fetch latitude and longitude from localStorage when the component is created
        this.getUserLocation();
        this.storedLocation = {
            latitude: localStorage.getItem('latitude'),
            longitude: localStorage.getItem('longitude')
        };
        console.log(this.storedLocation);
        this.searchLocation(this.storedLocation);
    },
    methods: {
        async getForecast() {
            this.foreCastDays = [];
            const options = {
                method: 'GET',
                url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
                params: {
                    q: this.location.name,
                    days: this.daysForecast
                },
                headers: {
                    'X-RapidAPI-Key': '76ce2ab572msh807526332335cc3p1f5d2fjsn1ed656ea6e05',
                    'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
                }
            };

            try {
                const response = await axios.request(options);
                console.log(response.data);
                this.foreCastDays = response.data.forecast.forecastday;
                console.log(this.foreCastDays);
                // $("get-forecast-modal").modal('show')
            } catch (error) {
                console.error(error);
                this.foreCastDays = [];
            }
        },
        async searchLocation(location) {
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
                params: {q: location.latitude+","+location.longitude},
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
        },
        getUserLocation() {
            if(this.storedLocation === null){
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(this.showPosition, this.showError);
                    // alert("Location Set Successfully")
                    swalAlertSimple("Done", "Location Co-ordinates Set SuccessFully", "success")
                } else {
                    // alert('Geolocation is not supported by this Device.');
                    swalAlertSimple("Opps!", "Geolocation is not supported by this Device.", "error")
                }
            }else{
                this.userLocation = this.storedLocation;
            }
            console.log(this.userLocation);
        },
        showPosition(position) {
            this.userLocation = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            };
            localStorage.setItem('latitude', position.coords.latitude);
            localStorage.setItem('longitude', position.coords.longitude);
            console.log(this.userLocation);
            this.storedLocation = {
                latitude: localStorage.getItem('latitude'),
                longitude: localStorage.getItem('longitude')
            };
            console.log(this.storedLocation);
        },
        showError(error) {
            console.log(this.userLocation);
            error.UNKNOWN_ERROR = "UNKNOWN ERROR";
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    alert('User denied the request for Geolocation.');
                    break;
                case error.POSITION_UNAVAILABLE:
                    alert('Location information is unavailable.');
                    break;
                case error.TIMEOUT:
                    alert('The request to get user location timed out.');
                    break;
                case error.UNKNOWN_ERROR:
                    alert('An unknown error occurred.');
                    break;
            }
        }
    }
});


