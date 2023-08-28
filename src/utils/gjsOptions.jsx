const gjsOptions = {
  height: '90vh',
  canvas: {
    styles: ['/stylesheets/canvas.css'],
  },
  deviceManager: {
    default: 'mobilePortrait',
    devices: [
      {
        id: 'mobileLandscape',
        name: 'Mobile landscape',
        width: '568px',
        widthMedia: '768px',
      },
      {
        id: 'mobilePortrait',
        name: 'Mobile portrait',
        width: '375px',
        widthMedia: '480px',
      },
      {
        id: 'tablet',
        name: 'Tablet',
        width: '770px',
        widthMedia: '992px',
      },
    ],
  },
  storageManager: {
    type: 'remote',
    stepsBeforeSave: 1,
    options: {
      remote: {
        urlStore: 'http://localhost:3001/save-draft',
        onStore: (data) => {
          console.log('onStore', data);
          return { data };
        },
      },
    },
    autosave: false,
    autoload: true,
    contentTypeJson: true,
    storeComponents: true,
    storeStyles: true,
    storeHtml: true,
    storeCss: true,
    headers: {
      'Content-Type': 'application/json',
    },
    json_encode: {
      'gjs-html': [],
      'gjs-css': [],
    },
  },
  undoManager: { trackSelection: false },
  selectorManager: { componentFirst: true },
  styleManager: {
    appendTo: "#style-manager-container",
    sectors: [
      {
        name: "General",
        open: false,
        buildProps: [
          "float",
          "display",
          "position",
          "top",
          "right",
          "left",
          "bottom",
        ],
      },
      {
        name: "Dimension",
        open: false,
        buildProps: [
          "width",
          "height",
          "max-width",
          "min-height",
          "margin",
          "padding",
        ],
      },
      {
        name: "Typography",
        open: false,
        buildProps: [
          "font-family",
          "font-size",
          "font-weight",
          "letter-spacing",
          "color",
          "line-height",
          "text-align",
          "text-shadow",
        ],
      },
      {
        name: "Decorations",
        open: false,
        buildProps: [
          "border-radius-c",
          "background-color",
          "border-radius",
          "border",
          "box-shadow",
          "background",
        ],
      },
      {
        name: "Extra",
        open: false,
        buildProps: ["opacity", "transition", "perspective", "transform"],
        properties: [
          {
            type: "slider",
            property: "opacity",
            defaults: 1,
            step: 0.01,
            max: 1,
            min: 0,
          },
        ],
      },
    ],
  }, 
  projectData: {
    assets: [
      'https://via.placeholder.com/350x250/78c5d6/fff',
      'https://via.placeholder.com/350x250/459ba8/fff',
      'https://via.placeholder.com/350x250/79c267/fff',
      'https://via.placeholder.com/350x250/c5d647/fff',
      'https://via.placeholder.com/350x250/f28c33/fff',
    ],
    pages: [
      {
        name: 'Home page',
        component: `<h1>Design Your Webview</h1>`,
      },
    ],
  },
};

export default gjsOptions;
