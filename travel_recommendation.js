function searchCondition() {
    const input = document.getElementById("countryInput").value.trim().toLowerCase();
    const resultDiv = document.getElementById("data-container");
    resultDiv.innerHTML = "";

    fetch("./travel_recommendation_api.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            const { beaches, temples, countries } = data;
            const country = countries.find(item => item.name.toLowerCase() === input);

            if (country) {
                renderCities(country.cities);
            } else if (beaches && beaches.some(beach => beach.name.toLowerCase() === input)) {
                renderItems(beaches);
            } else if (temples && temples.some(temple => temple.name.toLowerCase() === input)) {
                renderItems(temples);
            } else if (countries) {
                countries.forEach(country => renderCities(country.cities));
            } else {
                displayError();
            }
        })
        .catch(error => {
            console.error("Error:", error);
            displayError();
        });

    function renderCities(cities) {
        resultDiv.classList.add("bg-white", "py-4");
        cities.forEach(city => {
            resultDiv.innerHTML += `
                <div class="mb-8 p-5">
                    <h1 class="text-2xl font-bold mb-2">${city.name}</h1>
                    <img src="${city.imageUrl}" alt="${city.name}" class="mb-2 w-96">
                    <p class="text-lg">${city.description}</p>
                </div>
            `;
        });
    }

    function renderItems(items) {
        resultDiv.classList.add("bg-white", "py-4");
        items.forEach(item => {
            resultDiv.innerHTML += `
                <div class="mb-8">
                    <h1 class="text-2xl font-bold mb-2">${item.name}</h1>
                    <img src="${item.imageUrl}" alt="${item.name}" class="mb-2 w-96">
                    <p class="text-lg">${item.description}</p>
                </div>
            `;
        });
    }

    function displayError() {
        resultDiv.innerHTML = `<h1 class="text-4xl font-bold text-black text-center">¡No se encontró! Hubo un error.</h1>`;
    }
}

document.getElementById("btnSearch").addEventListener("click", searchCondition);

document.getElementById("countryInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        searchCondition();
        clearResults();
    }
});

function clearSearch() {
    document.getElementById("countryInput").value = "";
    clearResults();
}

function clearResults() {
    document.getElementById("data-container").innerHTML = "";
    const style = document.querySelector("style");
    if (style) style.remove();
    document.getElementById("data-container").className = "";
}
