import { conversionRules } from "./conversionRules.js";
import { apiMap } from "./apiMap.js";
import { objectsMap } from "./objectsMap.js";
document.addEventListener("DOMContentLoaded", function () {
  // Initialize select
  var selects = document.querySelectorAll("select");
  M.FormSelect.init(selects);

  // Dark mode toggle
  const darkModeToggle = document.getElementById("darkModeToggle");
  darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });

  // Tab navigation
  const tabLinks = document.querySelectorAll(".side-nav .collection-item");
  const tabContents = document.querySelectorAll(".tab-content");

  tabLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      tabContents.forEach((content) => content.classList.remove("active"));
      tabLinks.forEach((link) => link.classList.remove("active"));
      document.querySelector(targetId).classList.add("active");
      link.classList.add("active");
    });
  });

  // Initialize CodeMirror instances
  const snippetsEditor = CodeMirror.fromTextArea(
    document.getElementById("snippetsEditor"),
    {
      mode: "javascript",
      lineNumbers: true,
      theme: "default",
    }
  );

  const scriptGeneratorOutput = CodeMirror.fromTextArea(
    document.getElementById("scriptGeneratorOutput"),
    {
      mode: "javascript",
      lineNumbers: true,
      theme: "default",
      readOnly: true,
    }
  );

  const debugScript = CodeMirror.fromTextArea(
    document.getElementById("debugScript"),
    {
      mode: "javascript",
      lineNumbers: true,
      theme: "default",
    }
  );

  const fileEditor = CodeMirror.fromTextArea(
    document.getElementById("fileEditor"),
    {
      mode: "javascript",
      lineNumbers: true,
      theme: "default",
    }
  );

  // Converter functionality
  document.getElementById("convertBtn").addEventListener("click", function () {
    const input = document.getElementById("input").value;
    let output = input;
    conversionRules.forEach((rule) => {
      output = output.replace(rule.oldAPI, rule.newAPI);
    });
    document.getElementById("output").textContent = output;
  });

  const output = document.getElementById("output");
  const copyBtn = document.getElementById("copyBtn");

  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(output.textContent);
    M.toast({ html: "Copied to clipboard!" });
  });

  // API Map search functionality
  document
    .getElementById("apiMapSearch")
    .addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase();
      const filteredMap = apiMap.filter(
        (item) =>
          item.ss1.toLowerCase().includes(searchTerm) ||
          item.ss2.toLowerCase().includes(searchTerm) ||
          item.description.toLowerCase().includes(searchTerm)
      );
      displayResults(filteredMap, "apiMapResults");
    });

  // Objects search functionality
  document
    .getElementById("objectsSearch")
    .addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase();
      const filteredMap = objectsMap.filter(
        (item) =>
          item.ss1.toLowerCase().includes(searchTerm) ||
          item.ss2.toLowerCase().includes(searchTerm) ||
          item.description.toLowerCase().includes(searchTerm)
      );
      displayResults(filteredMap, "objectsResults");
    });

  function displayResults(results, elementId) {
    const resultsElement = document.getElementById(elementId);
    resultsElement.innerHTML = "";
    if (results.length > 0) {
      results.forEach((item) => {
        resultsElement.innerHTML += `
                    <div class="card">
                        <div class="card-content">
                            <span class="card-title">${item.ss1} → ${item.ss2}</span>
                            <p>${item.description}</p>
                        </div>
                    </div>
                `;
      });
    } else {
      resultsElement.innerHTML = "<p>No results found.</p>";
    }
  }

  // Code Snippets functionality
  const snippetsList = document.getElementById("snippetsList");
  const copySnippetBtn = document.getElementById("copySnippetBtn");
  const saveSnippetBtn = document.getElementById("saveSnippetBtn");

  // Sample snippets (replace with your own)
  const snippets = [
    { name: "Create Record", code: 'record.create({type: "customer"});' },
    {
      name: "Load Record",
      code: 'record.load({type: "customer", id: 123});',
    },
    { name: "Search", code: 'search.create({type: "customer"}).run();' },
  ];

  snippets.forEach((snippet) => {
    const snippetItem = document.createElement("div");
    snippetItem.classList.add("snippet-item");
    snippetItem.textContent = snippet.name;
    snippetItem.addEventListener("click", () => {
      snippetsEditor.setValue(snippet.code);
    });
    snippetsList.appendChild(snippetItem);
  });

  copySnippetBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(snippetsEditor.getValue());
    M.toast({ html: "Snippet copied to clipboard!" });
  });

  saveSnippetBtn.addEventListener("click", () => {
    // Add logic to save the current snippet
    M.toast({ html: "Snippet saved!" });
  });

  // Record Browser functionality
  const recordTypeSelect = document.getElementById("recordTypeSelect");
  const fieldsList = document.getElementById("fieldsList");

  // Sample record types (replace with actual NetSuite record types)
  const recordTypes = ["customer", "salesorder", "invoice", "item"];

  recordTypes.forEach((type) => {
    const option = document.createElement("option");
    option.value = type;
    option.textContent = type.charAt(0).toUpperCase() + type.slice(1);
    recordTypeSelect.appendChild(option);
  });

  recordTypeSelect.addEventListener("change", () => {
    // Add your record type fields logic here
    fieldsList.innerHTML = `<p>Fields for ${recordTypeSelect.value}:</p>
        <ul>
          <li>id</li>
          <li>name</li>
          <li>subsidiary</li>
          <!-- Add more fields based on the selected record type -->
        </ul>`;
  });

  // Script Generator functionality
  const scriptTypeList = document.getElementById("scriptTypeList");
  const copyScriptBtn = document.getElementById("copyScriptBtn");

  // Sample script types (replace with actual NetSuite script types)
  const scriptTypes = [
    "UserEventScript",
    "ClientScript",
    "MapReduceScript",
    "Suitelet",
  ];

  scriptTypes.forEach((type) => {
    const scriptTypeItem = document.createElement("div");
    scriptTypeItem.classList.add("script-type-item");
    scriptTypeItem.textContent = type;
    scriptTypeItem.addEventListener("click", () => {
      // Add logic to generate script based on the selected type
      scriptGeneratorOutput.setValue(
        `// Generated ${type}\n\ndefine(['N/record'], function(record) {\n    // Your code here\n});`
      );
    });
    scriptTypeList.appendChild(scriptTypeItem);
  });

  copyScriptBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(scriptGeneratorOutput.getValue());
    M.toast({ html: "Script copied to clipboard!" });
  });

  // Debugger functionality
  const runDebugBtn = document.getElementById("runDebugBtn");
  const stepOverBtn = document.getElementById("stepOverBtn");
  const stepIntoBtn = document.getElementById("stepIntoBtn");
  const stepOutBtn = document.getElementById("stepOutBtn");
  const debugOutput = document.getElementById("debugOutput");

  runDebugBtn.addEventListener("click", () => {
    // Add logic to run the script in the debugger
    debugOutput.textContent = "Running script...";
  });

  stepOverBtn.addEventListener("click", () => {
    // Add logic for step over functionality
    debugOutput.textContent += "\nStepped over";
  });

  stepIntoBtn.addEventListener("click", () => {
    // Add logic for step into functionality
    debugOutput.textContent += "\nStepped into";
  });

  stepOutBtn.addEventListener("click", () => {
    // Add logic for step out functionality
    debugOutput.textContent += "\nStepped out";
  });

  // Deployment functionality
  const deploymentScriptSelect = document.getElementById(
    "deploymentScriptSelect"
  );
  const deploymentAccountId = document.getElementById("deploymentAccountId");
  const deployBtn = document.getElementById("deployBtn");
  const deploymentOutput = document.getElementById("deploymentOutput");

  // Sample scripts for deployment (replace with actual scripts)
  const deploymentScripts = [
    "UserEvent_Customer",
    "Scheduled_Inventory",
    "Client_SalesOrder",
  ];

  deploymentScripts.forEach((script) => {
    const option = document.createElement("option");
    option.value = script;
    option.textContent = script;
    deploymentScriptSelect.appendChild(option);
  });

  deployBtn.addEventListener("click", () => {
    // Add logic to deploy the selected script
    const selectedScript = deploymentScriptSelect.value;
    const accountId = deploymentAccountId.value;
    deploymentOutput.textContent = `Deploying ${selectedScript} to account ${accountId}...`;
    // Implement actual deployment logic here
  });

  // File Explorer functionality
  const fileTree = document.getElementById("fileTree");
  const saveFileBtn = document.getElementById("saveFileBtn");

  // Sample file structure (replace with actual file structure)
  const files = [
    {
      name: "SuiteScripts",
      type: "folder",
      children: [
        {
          name: "lib",
          type: "folder",
          children: [{ name: "utils.js", type: "file" }],
        },
        { name: "UserEvent_Customer.js", type: "file" },
        { name: "Scheduled_Inventory.js", type: "file" },
      ],
    },
    {
      name: "Web Site Hosting Files",
      type: "folder",
      children: [
        { name: "index.html", type: "file" },
        { name: "styles.css", type: "file" },
      ],
    },
  ];

  function createFileTree(items, parentElement) {
    items.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item.name;
      li.classList.add(item.type);

      if (item.type === "folder" && item.children) {
        const ul = document.createElement("ul");
        createFileTree(item.children, ul);
        li.appendChild(ul);
      } else if (item.type === "file") {
        li.addEventListener("click", () => {
          // Load file content (implement actual file loading logic)
          fileEditor.setValue(
            `// Content of ${item.name}\n// Add your file content here`
          );
        });
      }

      parentElement.appendChild(li);
    });
  }

  createFileTree(files, fileTree);

  saveFileBtn.addEventListener("click", () => {
    // Add logic to save the current file
    M.toast({ html: "File saved!" });
  });

  // Search functionality
  const docSearch = document.getElementById("docSearch");
  const searchBtn = document.getElementById("searchBtn");
  const searchResults = document.getElementById("searchResults");

  searchBtn.addEventListener("click", () => {
    // Add logic to search NetSuite documentation
    const query = docSearch.value;
    // Implement actual search logic here
    searchResults.innerHTML = `
        <div class="search-result-item">
          <div class="search-result-title">Result 1 for "${query}"</div>
          <div class="search-result-snippet">This is a snippet of the search result...</div>
        </div>
        <div class="search-result-item">
          <div class="search-result-title">Result 2 for "${query}"</div>
          <div class="search-result-snippet">This is another snippet of the search result...</div>
        </div>
      `;
  });

  // Set the first tab as active by default
  document.querySelector(".side-nav .collection-item").click();
});
