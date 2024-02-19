var chart;

function fetchAndDisplayData(country = 'US', indicator = 'NY.GDP.MKTP.CD') {
    const apiUrl = `https://api.worldbank.org/v2/country/${country}/indicator/${indicator}?format=json&date=2010:2020`;

    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const dataPoints = data[1].map(item => ({
            label: item.date,
            y: item.value / 1000000000 // Convert the value to billions for readability
        })).reverse(); // Reverse the array to show the earliest year first

        chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            theme: "light2",
            title: {
                text: `GDP of ${country} (in Billions USD)`
            },
            axisY: {
                title: "GDP (Billions USD)",
                prefix: "$"
            },
            data: [{
                type: "line",
                yValueFormatString: "$#,##0.0B",
                dataPoints: dataPoints
            }]
        });
        chart.render();
    })
    .catch(error => console.error('Error fetching or processing data:', error));
}

function updateChart() {
    const country = document.getElementById('country').value;
    const indicator = document.getElementById('indicator').value;
    fetchAndDisplayData(country, indicator);
}

window.onload = function () {
    fetchAndDisplayData(); // Initialize chart with default data
};
