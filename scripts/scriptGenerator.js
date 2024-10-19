const scriptTypes = [
    { id: 'userEvent', name: 'User Event Script' },
    { id: 'clientScript', name: 'Client Script' },
    { id: 'mapReduce', name: 'Map/Reduce Script' },
    { id: 'restlet', name: 'RESTlet' },
    { id: 'suitelet', name: 'Suitelet' }
];

let scriptEditor;

function initializeScriptGenerator() {
    const scriptGeneratorSection = document.getElementById('scriptGenerator');
    scriptGeneratorSection.innerHTML = `
        <h2>Script Generator</h2>
        <div class="row">
            <div class="input-field col s12 m6">
                <select id="scriptTypeSelect">
                    <option value="" disabled selected>Choose a script type</option>
                    ${scriptTypes.map(type => `<option value="${type.id}">${type.name}</option>`).join('')}
                </select>
                <label>Script Type</label>
            </div>
        </div>
        <div class="row">
            <div class="col s12">
                <textarea id="scriptOutput"></textarea>
            </div>
        </div>
        <div class="row">
            <div class="col s12">
                <button id="copyScriptBtn" class="btn waves-effect waves-light">
                    Copy Script
                    <i class="material-icons right">content_copy</i>
                </button>
            </div>
        </div>
    `;

    setupScriptEditor();
    setupEventListeners();
    M.FormSelect.init(document.getElementById('scriptTypeSelect'));
}

function setupScriptEditor() {
    scriptEditor = CodeMirror.fromTextArea(document.getElementById("scriptOutput"), {
        lineNumbers: true,
        mode: "javascript",
        theme: "default",
        readOnly: true
    });
}

function setupEventListeners() {
    document.getElementById('scriptTypeSelect').addEventListener('change', handleScriptTypeChange);
    document.getElementById('copyScriptBtn').addEventListener('click', copyScriptToClipboard);
}

function handleScriptTypeChange(event) {
    const selectedType = event.target.value;
    const scriptTemplate = generateScriptTemplate(selectedType);
    scriptEditor.setValue(scriptTemplate);
}

function generateScriptTemplate(scriptType) {
    switch (scriptType) {
        case 'userEvent':
            return `/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 */
define(['N/record'], function(record) {
    function beforeSubmit(context) {
        // Your code here
    }

    return {
        beforeSubmit: beforeSubmit
    };
});`;
        case 'clientScript':
            return `/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 */
define(['N/currentRecord'], function(currentRecord) {
    function pageInit(context) {
        // Your code here
    }

    return {
        pageInit: pageInit
    };
});`;
        case 'mapReduce':
            return `/**
 * @NApiVersion 2.x
 * @NScriptType MapReduceScript
 */
define(['N/search'], function(search) {
    function getInputData() {
        // Your code here
    }

    function map(context) {
        // Your code here
    }

    function reduce(context) {
        // Your code here
    }

    function summarize(summary) {
        // Your code here
    }

    return {
        getInputData: getInputData,
        map: map,
        reduce: reduce,
        summarize: summarize
    };
});`;
        case 'restlet':
            return `/**
 * @NApiVersion 2.x
 * @NScriptType Restlet
 */
define(['N/record'], function(record) {
    function get(requestParams) {
        // Your code here
    }

    function post(requestBody) {
        // Your code here
    }

    return {
        get: get,
        post: post
    };
});`;
        case 'suitelet':
            return `/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */
define(['N/ui/serverWidget'], function(serverWidget) {
    function onRequest(context) {
        // Your code here
    }

    return {
        onRequest: onRequest
    };
});`;
        default:
            return '// Select a script type to generate template';
    }
}

function copyScriptToClipboard() {
    const scriptText = scriptEditor.getValue();
    navigator.clipboard.writeText(scriptText)
        .then(() => M.toast({ html: 'Script copied to clipboard!' }))
        .catch(err => {
            console.error('Failed to copy: ', err);
            M.toast({ html: 'Failed to copy. Please try again.' });
        });
}

export { initializeScriptGenerator };