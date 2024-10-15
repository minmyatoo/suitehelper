// conversionRules.js

export const conversionRules = [
  {
    name: "nlapiSetFieldValue to N/record.setValue()",
    oldAPI: /nlapiSetFieldValue\s*\(\s*(['"]?)(\w+)\1\s*,\s*(.+?)\s*\)/g,
    newAPI: "record.setValue({ fieldId: '$2', value: $3 })",
    description: "Sets the value of a field on the record.",
    modules: ["N/record", "N/currentRecord"],
    apis: ["Record.setValue(options)", "CurrentRecord.setValue(options)"],
  },
  {
    name: "nlapiGetFieldValue to N/record.getValue()",
    oldAPI: /nlapiGetFieldValue\s*\(\s*(['"]?)(\w+)\1\s*\)/g,
    newAPI: "record.getValue({ fieldId: '$2' })",
    description: "Retrieves the value of a field on the record.",
    modules: ["N/record", "N/currentRecord"],
    apis: ["Record.getValue(options)", "CurrentRecord.getValue(options)"],
  },
  {
    name: "nlapiLoadRecord to N/record.load()",
    oldAPI: /nlapiLoadRecord\s*\(\s*(['"]?)(\w+)\1\s*,\s*(\d+)\s*\)/g,
    newAPI: "record.load({ type: '$2', id: $3 })",
    description: "Loads an existing record from the system.",
    modules: ["N/record"],
    apis: ["Record.load(options)"],
  },
  {
    name: "nlapiCreateRecord to N/record.create()",
    oldAPI: /nlapiCreateRecord\s*\(\s*(['"]?)(\w+)\1\s*\)/g,
    newAPI: "record.create({ type: '$2' })",
    description: "Creates a new record in the system.",
    modules: ["N/record"],
    apis: ["Record.create(options)"],
  },
  {
    name: "nlapiSubmitRecord to N/record.submitFields()",
    oldAPI: /nlapiSubmitRecord\s*\(\s*(\w+)\s*,\s*(\w+)\s*,\s*(\w+)\s*\)/g,
    newAPI: "record.submitFields({ type: $1, id: $2, values: $3 })",
    description: "Submits a record to the system.",
    modules: ["N/record"],
    apis: ["Record.submitFields(options)"],
  },
  {
    name: "nlapiDeleteRecord to N/record.delete()",
    oldAPI: /nlapiDeleteRecord\s*\(\s*(['"]?)(\w+)\1\s*,\s*(\d+)\s*\)/g,
    newAPI: "record.delete({ type: '$2', id: $3 })",
    description: "Deletes a record from the system.",
    modules: ["N/record"],
    apis: ["Record.delete(options)"],
  },
  {
    name: "nlapiSearchRecord to N/search.create()",
    oldAPI: /nlapiSearchRecord\s*\(\s*(['"]?)(\w+)\1\s*,\s*(.*)?\)/g,
    newAPI: "search.create({ type: '$2', filters: $3 })",
    description: "Searches for records in the system.",
    modules: ["N/search"],
    apis: ["search.create(options)"],
  },
  {
    name: "nlapiGetFieldText to N/record.getText()",
    oldAPI: /nlapiGetFieldText\s*\(\s*(['"]?)(\w+)\1\s*\)/g,
    newAPI: "record.getText({ fieldId: '$2' })",
    description: "Retrieves the display text for a field value.",
    modules: ["N/record"],
    apis: ["Record.getText(options)"],
  },
  {
    name: "nlapiGetCurrentRecord to N/currentRecord.get()",
    oldAPI: /nlapiGetCurrentRecord\s*\(\)/g,
    newAPI: "currentRecord.get()",
    description: "Gets the current record object in client scripts.",
    modules: ["N/currentRecord"],
    apis: ["CurrentRecord.get()"],
  },
  {
    name: "nlapiAddDays(d, days) to Date manipulation",
    oldAPI: /nlapiAddDays\s*\(\s*(.+?)\s*,\s*(.+?)\s*\)/g,
    newAPI: "$1.setDate($1.getDate() + $2)",
    description:
      "Adds days to a date object. Use JavaScript Date methods instead.",
  },
  // Add more rules as needed
];
