// objectsBrowser.js

// Import objects map data (assuming you have this file)
import { objectsMapData } from '../data/objectsMapData.js';

export function initializeObjectsBrowser() {
    const objectsBrowserSection = document.getElementById('objectsBrowser');
    objectsBrowserSection.innerHTML = `
        <h2>Objects Browser</h2>
        <div class="row">
            <div class="input-field col s12">
                <input type="text" id="objectsSearch" placeholder="Search objects...">
                <label for="objectsSearch">Search</label>
            </div>
        </div>
        <div id="objectsResults"></div>
    `;

    const searchInput = objectsBrowserSection.querySelector('#objectsSearch');
    const resultsContainer = objectsBrowserSection.querySelector('#objectsResults');

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredResults = objectsMapData.filter(item => 
            item.ss1.toLowerCase().includes(searchTerm) ||
            item.ss2.toLowerCase().includes(searchTerm) ||
            item.description.toLowerCase().includes(searchTerm)
        );
        displayObjectsResults(filteredResults, resultsContainer);
    });

    // Initial display of all results
    displayObjectsResults(objectsMapData, resultsContainer);
}

function displayObjectsResults(results, container) {
    container.innerHTML = results.map(item => `
        <div class="card">
            <div class="card-content">
                <span class="card-title">${item.ss1} → ${item.ss2}</span>
                <p>${item.description}</p>
            </div>
        </div>
    `).join('');
}