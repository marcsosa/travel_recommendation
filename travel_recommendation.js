document.addEventListener('DOMContentLoaded', function () {
    // Función para realizar la búsqueda
    function search() {
        const searchInput = document.getElementById('searchInput').value.toLowerCase();
        const recommendations = document.querySelectorAll('.recommendation');

        recommendations.forEach(recommendation => {
            const text = recommendation.textContent.toLowerCase();
            if (text.includes(searchInput)) {
                recommendation.style.display = 'block';
            } else {
                recommendation.style.display = 'none';
            }
        });
    }

    // Función para limpiar la búsqueda y mostrar todas las recomendaciones
    function clearSearch() {
        const recommendations = document.querySelectorAll('.recommendation');
        recommendations.forEach(recommendation => {
            recommendation.style.display = 'block';
        });
    }

    // Fetch data from the JSON file
    function fetchData() {
        return fetch('travel_recommendation_api.json')
            .then(response => response.json())
            .catch(error => console.error('Error fetching data:', error));
    }

    // Function to handle keyword searches
    function handleSearch(keyword) {
        const lowercaseKeyword = keyword.toLowerCase();
        fetchData()
            .then(data => {
                let recommendations = [];
                if (lowercaseKeyword === 'beach' || lowercaseKeyword === 'beaches') {
                    recommendations = data.beachRecommendations;
                } else if (lowercaseKeyword === 'temple' || lowercaseKeyword === 'temples') {
                    recommendations = data.templeRecommendations;
                } else if (lowercaseKeyword === 'country' || lowercaseKeyword === 'countries') {
                    recommendations = data.countryRecommendations;
                } else {
                    // Keyword not recognized, handle accordingly
                    console.log('Keyword not recognized');
                    return;
                }
                displayRecommendations(recommendations);
            });
    }

    // Function to display recommendations
    function displayRecommendations(recommendations) {
        // Display recommendations in the UI
        const recommendationContainer = document.getElementById('recommendations');
        recommendationContainer.innerHTML = ''; // Clear previous recommendations
        recommendations.forEach(recommendation => {
            const recommendationElement = document.createElement('div');
            recommendationElement.classList.add('recommendation');
            recommendationElement.innerHTML = `
                <img src="${recommendation.imageUrl}" alt="${recommendation.name}">
                <h3>${recommendation.name}</h3>
                <p>${recommendation.description}</p>
            `;
            recommendationContainer.appendChild(recommendationElement);
        });
    }

    // Event listener for search button
    const searchForm = document.getElementById('search-form');
    searchForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form submission
        const keyword = document.getElementById('searchInput').value;
        handleSearch(keyword);
    });

    // Event listener for clear button
    const clearButton = document.getElementById('clear-button');
    clearButton.addEventListener('click', function () {
        clearSearch();
    });

    // Initial display of all recommendations on page load
    fetchData()
        .then(data => {
            const allRecommendations = [
                ...data.beachRecommendations,
                ...data.templeRecommendations,
                ...data.countryRecommendations
            ];
            displayRecommendations(allRecommendations);
        });
});
