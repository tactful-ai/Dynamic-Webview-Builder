import GjsEditor from '@grapesjs/react';
import gjsForms from 'grapesjs-plugin-forms';

const gjsOptions = {
    height: '100vh',
    storageManager: {
      type: 'remote',
      stepsBeforeSave: 1,
      options: {
        remote: {
          urlStore: 'http://127.0.0.1:3000/data', // Endpoint URL where to store data project
          //  urlLoad: 'https://your-server/endpoint/load', // Endpoint URL where to load data project
          onStore: (data) => {
            console.log('onStore', data);
            return { data}
          },
        },
      },
      autosave: true,
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

export function Builder(){
    const onEditor = (editor) => {
        console.log('Editor loaded', { editor });
        window.editor = editor;
      };
    return (
        <>
          {/* <button onClick={() => console.log(window.editor.getHtml())}>
            get html
          </button> */}
          <div>
            <GjsEditor
              className='gjs-custom-editor text-white bg-slate-900'
              grapesjs='https://unpkg.com/grapesjs'
              grapesjsCss='https://unpkg.com/grapesjs/dist/css/grapes.min.css'
              options={gjsOptions}
              plugins={[
                {
                  id: 'gjs-blocks-basic',
                  src: 'https://unpkg.com/grapesjs-blocks-basic',
                },
                gjsForms,
                {
                  id:'grapesjs-custom-code',
                  src:'https://unpkg.com/grapesjs-custom-code'
                },
                {
                  id:'grapesjs-tooltip',
                  src:'https://unpkg.com/grapesjs-tooltip',
                },                
                {
                  id:'grapesjs-tabs',
                  src:'https://unpkg.com/grapesjs-tabs',
                },
                {
                  id:'grapesjs-navbar',
                  src:'https://unpkg.com/grapesjs-navbar',
                },
                {
                  id:'grapesjs-component-countdown',
                  src:'https://unpkg.com/grapesjs-component-countdown',
                }
              ]}
              onEditor={onEditor}
            />
          </div>
        </>
      );
    
}

