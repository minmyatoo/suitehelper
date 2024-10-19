// data/conversionRules.js

export const conversionRules = [
  {
    name: "nlapiSetFieldValue to N/record.setValue()",
    oldAPI: /nlapiSetFieldValue\s*\(\s*(['"]?)(\w+)\1\s*,\s*(.+?)\s*\)/g,
    newAPI: "record.setValue({ fieldId: '$2', value: $3 })"
  },
  {
    name: "nlapiGetFieldValue to N/record.getValue()",
    oldAPI: /nlapiGetFieldValue\s*\(\s*(['"]?)(\w+)\1\s*\)/g,
    newAPI: "record.getValue({ fieldId: '$2' })"
  },
  {
    name: "nlapiLoadRecord to N/record.load()",
    oldAPI: /nlapiLoadRecord\s*\(\s*(['"]?)(\w+)\1\s*,\s*(\d+)\s*\)/g,
    newAPI: "record.load({ type: '$2', id: $3 })"
  },
  {
    name: "nlapiCreateRecord to N/record.create()",
    oldAPI: /nlapiCreateRecord\s*\(\s*(['"]?)(\w+)\1\s*\)/g,
    newAPI: "record.create({ type: '$2' })"
  },
  {
    name: "nlapiSubmitRecord to N/record.save()",
    oldAPI: /nlapiSubmitRecord\s*\(\s*(\w+)\s*\)/g,
    newAPI: "$1.save()"
  }
];