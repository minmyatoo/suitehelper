export const apiMap = [
  {
    ss1: "nlapiLoadRecord",
    ss2: "N/record.load",
    description: "Load an existing record",
  },
  {
    ss1: "nlapiCreateRecord",
    ss2: "N/record.create",
    description: "Create a new record",
  },
  {
    ss1: "nlapiSubmitRecord",
    ss2: "N/record.save",
    description: "Save a record",
  },
  {
    ss1: "nlapiDeleteRecord",
    ss2: "N/record.delete",
    description: "Delete a record",
  },
  {
    ss1: "nlapiTransformRecord",
    ss2: "N/record.transform",
    description: "Transform a record into another type",
  },
  {
    ss1: "nlapiCopyRecord",
    ss2: "N/record.copy",
    description: "Create a copy of a record",
  },
  {
    ss1: "nlapiSearchRecord",
    ss2: "N/search.create().run()",
    description: "Perform a record search",
  },
  {
    ss1: "nlapiCreateSearch",
    ss2: "N/search.create()",
    description: "Create a search",
  },
  { ss1: "nlapiSendEmail", ss2: "N/email.send", description: "Send an email" },
  {
    ss1: "nlapiRequestURL",
    ss2: "N/https.get or N/https.post",
    description: "Make an HTTP request",
  },
  // Add more mappings as needed
];
