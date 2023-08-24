import GjsEditor from '@grapesjs/react';
import gjsForms from 'grapesjs-plugin-forms';
import './customStyles.module.css'

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
        // editor.setCSS('.sp-container button', {
        //   'background-color': '#0000ff',
        //   'color': '#fff',
        //   'padding': '10px 20px',
        //   'border': 'none',
        //   'border-radius': '5px',
        // });

        editor.BlockManager.add('red-button-block', {
          label: 'Red Button',
          category: 'Styled Components',
          content: `<button class="custom-red-button" style="background-color: red; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;" contentEditable="true">Click Me</button>`,
        });

        editor.BlockManager.add('input-label-block', {
          label: 'input-label',
          category: 'Styled Components',
          content: `<div style="display: flex; flex-direction: column; align-items: center; font-family: Arial, sans-serif; border: 1px solid #ccc; border-radius: 5px; background-color: #f5f5f5; padding: 20px;">
          <div style="display: flex; flex-direction: row; align-items: center; margin-bottom: 10px;">
          <label for="name" style="margin-right: 10px;">Name:</label>
          <input type="text" id="name" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 3px; background-color: transparent;"></div>
        </div>`,
        });
        editor.BlockManager.add('centered-form-block', {
          label: 'Centered Form',
          category: 'Styled Components',
          content: `
          <div style="display: flex; flex-direction: column; align-items: center; font-family: Arial, sans-serif; border: 1px solid #ccc; border-radius: 5px; background-color: #f5f5f5; padding: 20px;">
          <h1 style="margin-bottom: 20px;">Form</h1>
          <div style="display: flex; flex-direction: row; align-items: center; margin-bottom: 10px;">
            <label for="name" style="margin-right: 10px;">Name:</label>
            <input type="text" id="name" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 3px; background-color: transparent;">
          </div>
          <div style="display: flex; flex-direction: row; align-items: center; margin-bottom: 10px;">
            <label for="mail" style="margin-right: 10px;">Mail:</label>
            <input type="text" id="mail" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 3px; background-color: transparent;">
          </div>
          <div style="display: flex; flex-direction: row; align-items: center; margin-bottom: 10px;">
            <label for="complaint" style="margin-right: 10px;">Complaint:</label>
            <input type="text" id="complaint" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 3px; background-color: transparent;">
          </div>
          <button style="background-color: green; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">Submit</button>
        </div>
          `,
        });
        editor.BlockManager.add('styled-faq', {
          label: 'Styled FAQ',
          category: 'Styled Components',
          content: `
            <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
              <h2 style="margin-bottom: 20px;">Frequently Asked Questions</h2>
              <div style="border-bottom: 1px solid #ccc; margin-bottom: 10px;">
                <h3 style="font-weight: bold;">Question 1:</h3>
                <p>Answer to Question 1</p>
              </div>
              <div style="border-bottom: 1px solid #ccc; margin-bottom: 10px;">
                <h3 style="font-weight: bold;">Question 2:</h3>
                <p>Answer to Question 2</p>
              </div>
              <!-- Add more questions and answers here -->
            </div>
          `,
        });
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
              className='gjs-custom-editor'
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

