const gjsOptions = {
  height: "100vh",
  canvas: {
    styles: ["/stylesheets/canvas.css"],
  },
  deviceManager: {
    default: "mobilePortrait",
    devices: [
      {
        id: "mobileLandscape",
        name: "Mobile landscape",
        width: "568px",
        widthMedia: "2000px",
      },
      {
        id: "mobilePortrait",
        name: "Mobile portrait",
        width: "375px",
        widthMedia: "2000px",
      },
      {
        id: "tablet",
        name: "Tablet",
        width: "770px",
        widthMedia: "2000px",
      },
    ],
  },
  undoManager: { trackSelection: false },
  selectorManager: { componentFirst: true },
  optsHtml: {
    allowScripts: true,
  },
  parser: {
    optionsHtml: { allowScripts: true }
  },
  projectData: {
    assets: [
      "https://via.placeholder.com/350x250/78c5d6/fff",
      "https://via.placeholder.com/350x250/459ba8/fff",
      "https://via.placeholder.com/350x250/79c267/fff",
      "https://via.placeholder.com/350x250/c5d647/fff",
      "https://via.placeholder.com/350x250/f28c33/fff",
    ],
    pages: [
      {
        name: "Home page",
        component: `<h1>Design Your Webview</h1>`,
      },
    ],
  },
};

export default gjsOptions;
