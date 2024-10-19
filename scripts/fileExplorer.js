// fileExplorer.js

let fileEditor;

const sampleFileStructure = [
    {
        name: 'SuiteScripts',
        type: 'folder',
        children: [
            {
                name: 'lib',
                type: 'folder',
                children: [
                    { name: 'utils.js', type: 'file', content: '// Utility functions' }
                ]
            },
            { name: 'UserEvent_Customer.js', type: 'file', content: '// User Event script for Customer record' },
            { name: 'Scheduled_Inventory.js', type: 'file', content: '// Scheduled script for Inventory updates' }
        ]
    },
    {
        name: 'Web Site Hosting Files',
        type: 'folder',
        children: [
            { name: 'index.html', type: 'file', content: '<html><body>Hello World</body></html>' },
            { name: 'styles.css', type: 'file', content: 'body { font-family: Arial, sans-serif; }' }
        ]
    }
];

export function initializeFileExplorer() {
    const fileExplorerSection = document.getElementById('fileExplorer');
    if (!fileExplorerSection) {
        console.error('File Explorer section not found in the DOM');
        return;
    }

    fileExplorerSection.innerHTML = `
        <h2>File Explorer</h2>
        <div class="row">
            <div class="col s12 m4">
                <div id="fileTree"></div>
            </div>
            <div class="col s12 m8">
                <textarea id="fileEditor"></textarea>
                <button id="saveFileBtn" class="btn waves-effect waves-light">
                    Save File
                    <i class="material-icons right">save</i>
                </button>
            </div>
        </div>
    `;

    setupFileEditor();
    const fileTreeContainer = document.getElementById('fileTree');
    if (fileTreeContainer) {
        createFileTree(sampleFileStructure, fileTreeContainer);
    } else {
        console.error('File tree container not found');
    }
    setupEventListeners();
}

function setupFileEditor() {
    const editorElement = document.getElementById("fileEditor");
    if (editorElement) {
        fileEditor = CodeMirror.fromTextArea(editorElement, {
            lineNumbers: true,
            mode: "javascript",
            theme: "default",
            readOnly: true
        });
    } else {
        console.error('File editor element not found');
    }
}

function createFileTree(items, container) {
    const ul = document.createElement('ul');
    ul.className = 'file-tree';
    
    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.name;
        li.className = item.type;
        
        if (item.type === 'folder' && item.children) {
            li.classList.add('folder-closed');
            const childContainer = document.createElement('ul');
            childContainer.style.display = 'none';
            createFileTree(item.children, childContainer);
            li.appendChild(childContainer);
            
            li.addEventListener('click', (e) => {
                e.stopPropagation();
                li.classList.toggle('folder-open');
                childContainer.style.display = li.classList.contains('folder-open') ? 'block' : 'none';
            });
        } else if (item.type === 'file') {
            li.addEventListener('click', () => loadFile(item));
        }
        
        ul.appendChild(li);
    });
    
    container.appendChild(ul);
}

function loadFile(file) {
    if (fileEditor) {
        fileEditor.setValue(file.content || '');
        fileEditor.setOption('readOnly', false);
    } else {
        console.error('File editor not initialized');
    }
}

function setupEventListeners() {
    const saveFileBtn = document.getElementById('saveFileBtn');
    if (saveFileBtn) {
        saveFileBtn.addEventListener('click', saveFile);
    } else {
        console.error('Save file button not found');
    }
}

function saveFile() {
    // In a real application, this would save the file content to the server
    M.toast({ html: 'File saved successfully!' });
}