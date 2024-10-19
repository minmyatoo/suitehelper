const sampleScripts = [
    { id: 1, name: 'CustomerUpdateUE.js', type: 'UserEventScript' },
    { id: 2, name: 'InvoiceValidationCS.js', type: 'ClientScript' },
    { id: 3, name: 'InventoryUpdateMR.js', type: 'MapReduceScript' }
];

function initializeDeployment() {
    const deploymentSection = document.getElementById('deployment');
    deploymentSection.innerHTML = `
        <h2>Script Deployment</h2>
        <div class="row">
            <div class="input-field col s12 m6">
                <select id="deploymentScriptSelect">
                    <option value="" disabled selected>Choose a script to deploy</option>
                    ${sampleScripts.map(script => `<option value="${script.id}">${script.name}</option>`).join('')}
                </select>
                <label>Script to Deploy</label>
            </div>
        </div>
        <div class="row">
            <div class="input-field col s12 m6">
                <input id="deploymentAccountId" type="text" class="validate">
                <label for="deploymentAccountId">NetSuite Account ID</label>
            </div>
        </div>
        <div class="row">
            <div class="col s12">
                <button id="deployBtn" class="btn waves-effect waves-light">
                    Deploy Script
                    <i class="material-icons right">cloud_upload</i>
                </button>
            </div>
        </div>
        <div class="row">
            <div class="col s12">
                <pre id="deploymentOutput" class="output-container"></pre>
            </div>
        </div>
    `;

    setupEventListeners();
    M.FormSelect.init(document.getElementById('deploymentScriptSelect'));
}

function setupEventListeners() {
    document.getElementById('deployBtn').addEventListener('click', handleDeploy);
}

function handleDeploy() {
    const scriptId = document.getElementById('deploymentScriptSelect').value;
    const accountId = document.getElementById('deploymentAccountId').value;
    
    if (!scriptId || !accountId) {
        M.toast({ html: 'Please select a script and enter an account ID.' });
        return;
    }

    const selectedScript = sampleScripts.find(script => script.id === parseInt(scriptId));
    
    if (!selectedScript) {
        M.toast({ html: 'Invalid script selected.' });
        return;
    }

    // Simulate deployment process
    const deploymentOutput = document.getElementById('deploymentOutput');
    deploymentOutput.textContent = 'Initiating deployment...\n';
    
    setTimeout(() => {
        deploymentOutput.textContent += `Deploying ${selectedScript.name} to account ${accountId}...\n`;
    }, 1000);

    setTimeout(() => {
        deploymentOutput.textContent += 'Validating script...\n';
    }, 2000);

    setTimeout(() => {
        deploymentOutput.textContent += 'Script validated successfully.\n';
    }, 3000);

    setTimeout(() => {
        deploymentOutput.textContent += `Creating deployment record for ${selectedScript.type}...\n`;
    }, 4000);

    setTimeout(() => {
        deploymentOutput.textContent += 'Deployment record created.\n';
    }, 5000);

    setTimeout(() => {
        deploymentOutput.textContent += 'Script deployed successfully!\n';
        M.toast({ html: 'Script deployed successfully!' });
    }, 6000);
}

export { initializeDeployment };