// Converter component for SuiteHelper Tool
import { conversionRules } from '/data/conversionRules.js';

let inputEditor, outputEditor;

function initializeConverter() {
    const converterSection = document.getElementById('converter');
    converterSection.innerHTML = `
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 class="text-2xl font-medium mb-6">API Converter</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h3 class="text-lg font-medium mb-2">Input (Old NetSuite API)</h3>
                    <div id="converterInput"></div>
                </div>
                <div>
                    <h3 class="text-lg font-medium mb-2">Output (New NetSuite API)</h3>
                    <div id="converterOutput"></div>
                </div>
            </div>
            <div class="mt-6 flex justify-center space-x-4">
                <button id="convertBtn" class="btn btn-primary">
                    Convert
                    <i class="material-icons right">send</i>
                </button>
                <button id="copyBtn" class="btn btn-secondary">
                    Copy Output
                    <i class="material-icons right">content_copy</i>
                </button>
                <button id="clearBtn" class="btn btn-danger">
                    Clear
                    <i class="material-icons right">clear</i>
                </button>
            </div>
            <div id="conversionStats" class="mt-6" style="display: none;">
                <div class="card bg-blue-700 text-white rounded-lg shadow-md">
                    <div class="card-content">
                        <h3 class="card-title text-lg font-medium">Conversion Statistics</h3>
                        <ul id="statslist" class="list-disc list-inside"></ul>
                    </div>
                </div>
            </div>
        </div>
    `;

    setupEditors();
    setupEventListeners();
}

function setupEditors() {
    inputEditor = CodeMirror(document.getElementById("converterInput"), {
        lineNumbers: true,
        mode: "javascript",
        theme: "material",
        autoCloseBrackets: true,
        matchBrackets: true,
        indentUnit: 4,
        tabSize: 4,
        indentWithTabs: true,
        extraKeys: { "Ctrl-Space": "autocomplete" },
        placeholder: "Enter your old NetSuite API code here..."
    });

    outputEditor = CodeMirror(document.getElementById("converterOutput"), {
        lineNumbers: true,
        mode: "javascript",
        theme: "material",
        readOnly: true,
        placeholder: "Converted code will appear here..."
    });

    // Set initial height
    inputEditor.setSize(null, 300);
    outputEditor.setSize(null, 300);

    // Ensure editors resize properly
    window.addEventListener('resize', () => {
        inputEditor.refresh();
        outputEditor.refresh();
    });
}

function setupEventListeners() {
    const convertBtn = document.getElementById('convertBtn');
    const copyBtn = document.getElementById('copyBtn');
    const clearBtn = document.getElementById('clearBtn');

    convertBtn.addEventListener('click', handleConversion);
    copyBtn.addEventListener('click', copyToClipboard);
    clearBtn.addEventListener('click', clearAll);

    // Add input event listener for real-time conversion
    inputEditor.on('change', debounce(handleConversion, 500));
}

function handleConversion() {
    const input = inputEditor.getValue();
    if (!input.trim()) {
        outputEditor.setValue('');
        updateConversionStats({});
        return;
    }
    try {
        const { convertedCode, stats } = convertCode(input);
        outputEditor.setValue(convertedCode);
        updateConversionStats(stats);
        M.toast({ html: 'Conversion successful!', classes: 'green' });
    } catch (error) {
        outputEditor.setValue(`Error during conversion: ${error.message}`);
        console.error('Conversion error:', error);
        M.toast({ html: 'Error during conversion. Check console for details.', classes: 'red' });
    }
}

function convertCode(code) {
    let convertedCode = code;
    let stats = {};

    conversionRules.forEach(rule => {
        const regex = new RegExp(rule.oldAPI, 'g');
        const matches = convertedCode.match(regex);
        if (matches) {
            stats[rule.name] = matches.length;
            convertedCode = convertedCode.replace(regex, rule.newAPI);
        }
    });

    return { convertedCode, stats };
}

function updateConversionStats(stats) {
    const statslist = document.getElementById('statslist');
    const statsSection = document.getElementById('conversionStats');

    if (Object.keys(stats).length > 0) {
        statslist.innerHTML = Object.entries(stats)
            .map(([rule, count]) => `
                <li>
                    <span class="badge bg-blue-800 text-white rounded-full px-2 py-1 mr-2">${count}</span>
                    ${rule}
                </li>
            `)
            .join('');
        statsSection.style.display = 'block';
    } else {
        statsSection.style.display = 'none';
    }
}

function copyToClipboard() {
    const outputText = outputEditor.getValue();
    navigator.clipboard.writeText(outputText)
        .then(() => M.toast({ html: 'Copied to clipboard!', classes: 'green' }))
        .catch(err => {
            console.error('Failed to copy: ', err);
            M.toast({ html: 'Failed to copy. Please try again.', classes: 'red' });
        });
}

function clearAll() {
    inputEditor.setValue('');
    outputEditor.setValue('');
    document.getElementById('conversionStats').style.display = 'none';
    M.toast({ html: 'All cleared!', classes: 'blue' });
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

export { initializeConverter };