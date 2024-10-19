// scripts/apiMap.js

import { apiMapData } from '../data/apiMapData.js';

function initializeApiMap() {
    const apiMapSection = document.getElementById('apiMap');
    apiMapSection.innerHTML = `
        <h2>API Map</h2>
        <div class="row">
            <div class="input-field col s12">
                <input type="text" id="apiMapSearch" placeholder="Search API...">
                <label for="apiMapSearch">Search</label>
            </div>
        </div>
        <div id="apiMapResults"></div>
    `;

    const searchInput = apiMapSection.querySelector('#apiMapSearch');
    const resultsContainer = apiMapSection.querySelector('#apiMapResults');

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredResults = apiMapData.filter(item => 
            item.ss1.toLowerCase().includes(searchTerm) ||
            item.ss2.toLowerCase().includes(searchTerm) ||
            item.description.toLowerCase().includes(searchTerm)
        );
        displayApiMapResults(filteredResults, resultsContainer);
    });

    // Initial display of all results
    displayApiMapResults(apiMapData, resultsContainer);
}

function displayApiMapResults(results, container) {
    container.innerHTML = results.map(item => `
        <div class="card">
            <div class="card-content">
                <span class="card-title">${item.ss1} → ${item.ss2}</span>
                <p>${item.description}</p>
            </div>
        </div>
    `).join('');
}

export { initializeApiMap };