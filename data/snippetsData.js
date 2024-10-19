// snippetsData.js

const snippetsData = [
  {
    "name": "Function with Nested Loop",
    "code": "function findDuplicates(arr) {\n    const seen = new Set();\n    const duplicates = new Set();\n    for (const item of arr) {\n        if (seen.has(item)) {\n            duplicates.add(item);\n        } else {\n            seen.add(item);\n        }\n    }\n    return Array.from(duplicates);\n}"
  },
  {
    "name": "Asynchronous Delay",
    "code": "async function delay(ms) {\n    return new Promise(resolve => setTimeout(resolve, ms));\n}\n\nasync function main() {\n    console.log('Starting...');\n    await delay(2000);\n    console.log('Done!');\n}"
  },
  {
    "name": "Simple API Call",
    "code": "async function fetchData() {\n    const response = await fetch('https://api.example.com/data');\n    const data = await response.json();\n    return data;\n}"
  }
];

export default snippetsData;