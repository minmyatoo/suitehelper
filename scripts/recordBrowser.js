const recordTypes = ['customer', 'salesorder', 'invoice', 'item'];
const sampleFields = {
    customer: ['entityid', 'companyname', 'email', 'phone'],
    salesorder: ['tranid', 'entity', 'trandate', 'total'],
    invoice: ['tranid', 'entity', 'trandate', 'total'],
    item: ['itemid', 'displayname', 'type', 'baseprice']
};

function initializeRecordBrowser() {
    const recordBrowserSection = document.getElementById('recordBrowser');
    recordBrowserSection.innerHTML = `
        <h2>Record Browser</h2>
        <div class="row">
            <div class="input-field col s12 m6">
                <select id="recordTypeSelect">
                    <option value="" disabled selected>Choose a record type</option>
                    ${recordTypes.map(type => `<option value="${type}">${type}</option>`).join('')}
                </select>
                <label>Record Type</label>
            </div>
        </div>
        <div id="fieldsList" class="row"></div>
    `;

    setupEventListeners();
    M.FormSelect.init(document.getElementById('recordTypeSelect'));
}

function setupEventListeners() {
    document.getElementById('recordTypeSelect').addEventListener('change', handleRecordTypeChange);
}

function handleRecordTypeChange(event) {
    const selectedType = event.target.value;
    const fields = sampleFields[selectedType] || [];
    displayFields(fields);
}

function displayFields(fields) {
    const fieldsList = document.getElementById('fieldsList');
    fieldsList.innerHTML = fields.map(field => `
        <div class="col s12 m6">
            <div class="card">
                <div class="card-content">
                    <span class="card-title">${field}</span>
                    <p>Sample data for ${field}</p>
                </div>
                <div class="card-action">
                    <a href="#" class="view-field-details">View Details</a>
                </div>
            </div>
        </div>
    `).join('');

    // Add event listeners for "View Details" links
    fieldsList.querySelectorAll('.view-field-details').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const fieldName = e.target.closest('.card').querySelector('.card-title').textContent;
            showFieldDetails(fieldName);
        });
    });
}

function showFieldDetails(fieldName) {
    // In a real application, this would fetch actual field details from NetSuite
    M.Modal.init(document.createElement('div'), {
        html: `
            <div class="modal">
                <div class="modal-content">
                    <h4>Field Details: ${fieldName}</h4>
                    <p>Type: Text</p>
                    <p>Label: ${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}</p>
                    <p>Mandatory: No</p>
                </div>
                <div class="modal-footer">
                    <a href="#!" class="modal-close waves-effect waves-green btn-flat">Close</a>
                </div>
            </div>
        `
    }).open();
}

export { initializeRecordBrowser };