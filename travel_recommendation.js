


function resetBusqueda() {
    document.getElementById('searchInput').value = '';
    displayResults([]);
}

document.getElementById('searchInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        ObtenerData();
    }
}); 

let dataJson;
function ObtenerData() {
    const keyword = document.getElementById('searchInput').value.trim().toLowerCase();
    if (keyword === '') {
        console.log('Invalid keyword please try again');
        return;
    }

    fetch('./travel_recommendation_api.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response error: ' + response);
            }
            return response.json();
        })
        .then(data => {
            dataJson = data;
            filterResults(keyword);
        })
        .catch(error => {
            console.error('There was a problem.. :', error);
        });
}

function filterResults(keyword) {
    const filteredCities = [];

    dataJson.countries.forEach(country => {
        country.cities.forEach(city => {
            if (city.name.toLowerCase().includes(keyword) || city.description.toLowerCase().includes(keyword)) {
                filteredCities.push(city);
            }
        });
    });

    if (keyword.toLowerCase().includes('temple')) {
        dataJson.temples.forEach(temple => {
            filteredCities.push(temple);
        });
    }

    if (keyword.toLowerCase().includes('beach')) {
        dataJson.beaches.forEach(beach => {
            filteredCities.push(beach);
        });
    }

    displayResults(filteredCities);
}

function displayResults(results) {
    const cardsContainer = document.getElementById('displayData');
    cardsContainer.innerHTML = '';

    results.forEach(city => {
        const card = `
        <div class="bg-blue-500 text-center  text-white text-2xl rounded-2xl">${city.name}</div>
        <div class="bg-white rounded-lg shadow-md my-1 p-4">
            <img src="${city.imageUrl}" alt="${city.name}" class="w-full h-40 object-cover mb-4 rounded-md">
            <h3 class="text-lg font-semibold mb-2">${city.name}</h3>
            <p>${city.description}</p>
            <button class=" mt-2 px-3 bg-blue-500 text-white py-2 rounded hover:bg-blue-800">Visitar</button>
        </div>
    `;
        cardsContainer.innerHTML += card;
    });
}