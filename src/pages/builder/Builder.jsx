import GjsEditor from '@grapesjs/react';
import gjsOptions from '/src/utils/gjsOptions';
import { editorPlugins } from '/src/utils/plugins';

export function Builder(){
  
    const onEditor = (editor) => {
        editor.BlockManager.add('input-label-block', {
          label: 'input-label',
          category: 'Styled Components',
          content: `<div style="display: flex; flex-direction: column; align-items: center; font-family: Arial, sans-serif; border: 1px solid #ccc; border-radius: 5px; background-color: #f5f5f5; padding: 20px;">
          <div style="display: flex; flex-direction: row; align-items: center; margin-bottom: 10px;">
          <label for="name" style="margin-right: 10px;">Name:</label>
          <input type="text" id="name" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 3px; background-color: transparent;"></div>
        </div>`,
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
            </div>
          `,
        });
        window.editor = editor;
      };
      
    return (
        <>
          <div>
            <GjsEditor
              className='gjs-custom-editor'
              grapesjs='https://unpkg.com/grapesjs'
              grapesjsCss='https://unpkg.com/grapesjs/dist/css/grapes.min.css'
              options={gjsOptions}
              plugins={editorPlugins}
              onEditor={onEditor}
            />
          </div>
        </>
      );
    
}

