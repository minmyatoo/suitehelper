// codeSnippets.js

import snippetsData from '../data/snippetsData.js';

export function initializeCodeSnippets() {
    const codeSnippetsSection = document.getElementById('codeSnippets');
    codeSnippetsSection.innerHTML = `
        <div class="code-snippets-container">
            <h2 class="code-snippets-title">Code Snippets</h2>
            <div class="code-snippets-search">
                <input type="text" id="snippetSearchInput" placeholder="Search snippets..." />
            </div>
            <div class="row">
                <div class="col s12 m4">
                    <div class="code-snippets-list">
                        <ul id="snippetsList" class="collection"></ul>
                    </div>
                </div>
                <div class="col s12 m8">
                    <div class="code-snippets-editor">
                        <textarea id="snippetEditor"></textarea>
                        <div class="code-snippets-editor-actions">
                            <button id="saveSnippetBtn" class="btn btn-primary">
                                Save Snippet
                                <i class="material-icons right">save</i>
                            </button>
                            <button id="copySnippetBtn" class="btn btn-secondary">
                                Copy Snippet
                                <i class="material-icons right">content_copy</i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    const snippetsList = codeSnippetsSection.querySelector('#snippetsList');
    const snippetEditor = codeSnippetsSection.querySelector('#snippetEditor');
    const saveSnippetBtn = codeSnippetsSection.querySelector('#saveSnippetBtn');
    const copySnippetBtn = codeSnippetsSection.querySelector('#copySnippetBtn');
    const snippetSearchInput = codeSnippetsSection.querySelector('#snippetSearchInput');

    // Initialize CodeMirror for snippet editor
    const editor = CodeMirror.fromTextArea(snippetEditor, {
        lineNumbers: true,
        mode: 'javascript',
        theme: 'material',
        autofocus: true,
        viewportMargin: Infinity // Ensure the editor is always fully visible
    });

    // Populate snippets list
    function renderSnippetsList(searchTerm = '') {
        snippetsList.innerHTML = '';
        snippetsData.filter(snippet => snippet.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .forEach(snippet => {
                const li = document.createElement('li');
                li.className = 'collection-item';
                li.textContent = snippet.name;
                li.addEventListener('click', () => {
                    editor.setValue(snippet.code);
                    editor.focus();
                });
                snippetsList.appendChild(li);
            });
    }

    renderSnippetsList();

    // Save snippet functionality
    saveSnippetBtn.addEventListener('click', () => {
        const snippetCode = editor.getValue();
        const snippetName = prompt('Enter a name for the snippet:');
        if (snippetName) {
            console.log('Saving snippet:', { name: snippetName, code: snippetCode });
            M.toast({ html: 'Snippet saved!' });
            const newSnippet = { name: snippetName, code: snippetCode };
            snippetsData.push(newSnippet);
            renderSnippetsList();
        }
    });

    // Copy snippet functionality
    copySnippetBtn.addEventListener('click', () => {
        const snippetCode = editor.getValue();
        navigator.clipboard.writeText(snippetCode)
            .then(() => M.toast({ html: 'Snippet copied to clipboard!' }))
            .catch(err => {
                console.error('Failed to copy snippet:', err);
                M.toast({ html: 'Failed to copy snippet. Please try again.' });
            });
    });

    // Snippet search functionality
    snippetSearchInput.addEventListener('input', () => {
        const searchTerm = snippetSearchInput.value;
        renderSnippetsList(searchTerm);
    });
}