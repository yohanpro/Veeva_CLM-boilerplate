const { distDir } = require("../../gulpfile");
const {
  presentation,
  ProductName,
  DirectoryOfPresentation,
  SeperateMainAndAdd
} = require("../../config.json");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: `${distDir}/test.csv`,
  header: [
    { id: "pres.crm_presentation_id__v", title: "pres.crm_presentation_id__v" },
    { id: "external_id__v", title: "external_id__v" },
    { id: "name__v", title: "name__v" },
    { id: "Create Presentation", title: "Create Presentation" },
    { id: "Type", title: "Type" },
    { id: "lifecycle__v", title: "lifecycle__v" },
    { id: "Presentation Link", title: "Presentation Link" },
    { id: "Fields Only", title: "Fields Only" },
    { id: "pres.crm_training__v", title: "pres.crm_training__v" },
    { id: "pres.crm_hidden__v", title: "pres.crm_hidden__v" },
    { id: "pres.product__v.name__v", title: "pres.product__v.name__v" },
    { id: "slide.crm_media_type__v", title: "slide.crm_media_type__v" },
    {
      id: "slide.crm_disable_actions__v",
      title: "slide.crm_disable_actions__v"
    },
    { id: "slide.product__v.name__v", title: "slide.product__v.name__v" },
    { id: "slide.filename", title: "slide.filename" },
    {
      id: "slide.crm_shared_resource__v",
      title: "slide.crm_shared_resource__v"
    },
    { id: "slide.clm_content__v", title: "slide.clm_content__v" },
    { id: "pres.clm_content__v", title: "pres.clm_content__v" },
    {
      id: "slide.related_shared_resource__v",
      title: "slide.related_shared_resource__v"
    },
    { id: "pres.engage_content__v", title: "pres.engage_content__v" },
    { id: "slide.engage_content__v", title: "slide.engage_content__v" },
    { id: "pres.cobrowse_content__v", title: "pres.cobrowse_content__v" }
  ]
});

const records = [
  {
    "pres.crm_presentation_id__v": `${presentation}`,
    external_id__v: `${DirectoryOfPresentation}`
  },
  { name: "Mary", lang: "English" }
];

csvWriter
  .writeRecords(records) // returns a promise
  .then(() => {
    console.log("...Done");
  });

// This will produce a file path/to/file.csv with following contents:
//
//   NAME,LANGUAGE
//   Bob,"French, English"
//   Mary,English
