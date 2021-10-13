// Personal API Key for OpenWeatherMap API


const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=164de3f9950ed609a3d1ddab1c723f31';
//i do not know why this statement does not work
// const newWeatherState = document.getElementById('zip').value;
const newWeatherState = '94040'

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);
/* Function called by event listener */
function performAction(e) {
    const feelings = document.getElementById('feelings').value;
    getWeatherDemo(baseURL, newWeatherState, apiKey)
        .then(function (data) {
            console.log(data);
            postData('/addData', { temp: data.main.temp, data: data.weather[0].description, flng: feelings })
        });
    updateUI();

};
/* Function to GET Web API Data*/
const getWeatherDemo = async (baseURL, newWeatherState, key) => {
    const res = await fetch(baseURL + newWeatherState + key);
    try {

        const data = await res.json();
        // console.log(data);
        return data;



    } catch (error) {
        //  handling errors
        console.log("error", error);
    }
}

/* Function to GET Project Data */


/* Function to POST data */
const postData = async (url = '', data = {}) => {
    // console.log(data)
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
}
// Ubdate Demo
const updateUI = async () => {
    const res = await fetch('/getData')
    try {
        const allData = await res.json();
        // console.log(allData);
        document.getElementById('date').innerHTML = allData.weatherState;
        document.getElementById('temp').innerHTML = allData.temperature;
        document.getElementById('content').innerHTML = allData.feeling;

    } catch (error) {
        console.log("error", error);
    }
}
