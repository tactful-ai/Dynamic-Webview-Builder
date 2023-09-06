const gjsOptions = {
  height: '100vh',
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
        widthMedia: '2000px',
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
