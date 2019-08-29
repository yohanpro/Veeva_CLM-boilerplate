const { distDir } = require("../../gulpfile");
const {
  presentation,
  ProductName,
  DirectoryOfPresentation,
  SeperateMainAndAdd,
  numberOfSlide
} = require("../../config.json");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const gulp = require("gulp");
const shell = require("shelljs");
const csvWriter = createCsvWriter({
  path: `${distDir}/vault.csv`,
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

const records = () => {
  let arr = null;
  if (SeperateMainAndAdd) {
    arr = [
      {
        "pres.crm_presentation_id__v": `${presentation}_ADD`,
        external_id__v: `${presentation}_ADD`,
        name__v: `${presentation}`,
        Type: "Presentation",
        lifecycle__v: "Binder Lifecycle",
        "pres.crm_training__v": "FALSE",
        "pres.crm_hidden__v": "TRUE",
        "pres.product__v.name__v": `${ProductName}`,
        "pres.clm_content__v": "YES",
        "pres.engage_content__v": "No",
        "pres.cobrowse_content__v": "No"
      },
      {
        "pres.crm_presentation_id__v": `${presentation}_MAIN`,
        external_id__v: `${presentation}_MAIN`,
        name__v: `${presentation}`,
        Type: "Presentation",
        lifecycle__v: "Binder Lifecycle",
        "pres.crm_training__v": "FALSE",
        "pres.crm_hidden__v": "TRUE",
        "pres.product__v.name__v": `${ProductName}`,
        "pres.clm_content__v": "YES",
        "pres.engage_content__v": "No",
        "pres.cobrowse_content__v": "No"
      },
      {
        external_id__v: `${presentation}_Shared`,
        name__v: `${presentation}_Shared`,
        "Create Presentation": "FALSE",
        Type: "Shared",
        lifecycle__v: "CRM Content Lifecycle",
        "Fields Only": "FALSE",
        "slide.crm_media_type__v": "HTML",
        "slide.crm_disable_actions__v": "Zoom, Swipe",
        "slide.product__v.name__v": `${ProductName}`,
        "slide.filename": `${presentation}_Shared.zip`,
        "slide.crm_shared_resource__v": "YES",
        "slide.clm_content__v": "YES",
        "slide.engage_content__v": "No"
      },
      {
        name__v: `${presentation}_PI`,
        "Create Presentation": "FALSE",
        Type: "Slide",
        lifecycle__v: "CRM Content Lifecycle",
        "Presentation Link": `${presentation}_ADD`,
        "Fields Only": "FALSE",
        "slide.crm_media_type__v": "HTML",
        "slide.crm_disable_actions__v": "Zoom, Swipe",
        "slide.product__v.name__v": `${ProductName}`,
        "slide.filename": `${presentation}_PI.zip`,
        "slide.clm_content__v": "YES",
        "slide.related_shared_resource__v": `${presentation}_Shared`,
        "slide.engage_content__v": "No"
      },
      {
        name__v: `${presentation}_REFS`,
        "Create Presentation": "FALSE",
        Type: "Slide",
        lifecycle__v: "CRM Content Lifecycle",
        "Presentation Link": `${presentation}_ADD`,
        "Fields Only": "FALSE",
        "slide.crm_media_type__v": "HTML",
        "slide.crm_disable_actions__v": "Zoom, Swipe",
        "slide.product__v.name__v": `${ProductName}`,
        "slide.filename": `${presentation}_REFS.zip`,
        "slide.clm_content__v": "YES",
        "slide.related_shared_resource__v": `${presentation}_Shared`,
        "slide.engage_content__v": "No"
      }
    ];
  } else {
    arr = [
      {
        "pres.crm_presentation_id__v": `${presentation}`,
        external_id__v: `${presentation}`,
        name__v: `${presentation}`,
        Type: "Presentation",
        lifecycle__v: "Binder Lifecycle",
        "pres.crm_training__v": "FALSE",
        "pres.crm_hidden__v": "FALSE",
        "pres.product__v.name__v": `${ProductName}`,
        "pres.clm_content__v": "YES",
        "pres.engage_content__v": "No",
        "pres.cobrowse_content__v": "No"
      },
      {
        external_id__v: `${presentation}_Shared`,
        name__v: `${presentation}_Shared`,
        "Create Presentation": "FALSE",
        Type: "Shared",
        lifecycle__v: "CRM Content Lifecycle",
        "Fields Only": "FALSE",
        "slide.crm_media_type__v": "HTML",
        "slide.crm_disable_actions__v": "Zoom, Swipe",
        "slide.product__v.name__v": `${ProductName}`,
        "slide.filename": `${presentation}_Shared.zip`,
        "slide.crm_shared_resource__v": "YES",
        "slide.clm_content__v": "YES",
        "slide.engage_content__v": "No"
      }
    ];
  }

  makeNormalSlideCSV(arr);
  arr.push(
    {
      name__v: `${presentation}_PI`,
      "Create Presentation": "FALSE",
      Type: "Slide",
      lifecycle__v: "CRM Content Lifecycle",
      "Presentation Link": `${presentation}`,
      "Fields Only": "FALSE",
      "slide.crm_media_type__v": "HTML",
      "slide.crm_disable_actions__v": "Zoom, Swipe",
      "slide.product__v.name__v": `${ProductName}`,
      "slide.filename": `${presentation}_PI.zip`,
      "slide.clm_content__v": "YES",
      "slide.related_shared_resource__v": `${presentation}_Shared`,
      "slide.engage_content__v": "No"
    },
    {
      name__v: `${presentation}_REFS`,
      "Create Presentation": "FALSE",
      Type: "Slide",
      lifecycle__v: "CRM Content Lifecycle",
      "Presentation Link": `${presentation}`,
      "Fields Only": "FALSE",
      "slide.crm_media_type__v": "HTML",
      "slide.crm_disable_actions__v": "Zoom, Swipe",
      "slide.product__v.name__v": `${ProductName}`,
      "slide.filename": `${presentation}_REFS.zip`,
      "slide.clm_content__v": "YES",
      "slide.related_shared_resource__v": `${presentation}_Shared`,
      "slide.engage_content__v": "No"
    }
  );
  return arr;
};

const makeNormalSlideCSV = arr => {
  for (let i = 0; i < numberOfSlide; i++) {
    let slide = null;
    let name = "";
    if (i < 10) {
      name = "00" + i;
    } else if (i >= 10) {
      name = "0" + i;
    }
    slide = {
      name__v: `${presentation}_${name}`,
      "Create Presentation": "FALSE",
      Type: "Slide",
      lifecycle__v: "CRM Content Lifecycle",
      "Presentation Link": `${
        SeperateMainAndAdd === true ? `${presentation}_MAIN` : `${presentation}`
      }`,
      "Fields Only": "FALSE",
      "slide.crm_media_type__v": "HTML",
      "slide.crm_disable_actions__v": "Zoom, Swipe",
      "slide.product__v.name__v": `${ProductName}`,
      "slide.filename": `${presentation}_${name}.zip`,
      "slide.clm_content__v": "YES",
      "slide.related_shared_resource__v": `${presentation}_Shared`,
      "slide.engage_content__v": "No"
    };
    arr.push(slide);
  }
  return arr;
};
csvWriter
  .writeRecords(records()) // returns a promise
  .then(() => {
    console.log("...Done");
  });

gulp.task("makeCSV", () => {
  shell.exec("node gulp/task/makeCsv.js");
});
