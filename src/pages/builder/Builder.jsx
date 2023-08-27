import GjsEditor from '@grapesjs/react';
import gjsOptions from '/src/utils/gjsOptions';
import { editorPlugins } from '/src/utils/plugins';

export function Builder(){

    const onEditor = (editor) => {
      editor.Panels.addButton('options',
        [{
          id: 'save-db',
          className: 'fa fa-floppy-o',
          command: 'save-db',
          attributes: {title: 'Save DB'}
        }]
      );

    editor.Commands.add('save-db', {
      run: function (editor, sender) {
        sender && sender.set('active', 0); // Turn off the button
        editor.store();

        const htmldata = editor.getHtml();
        const cssdata = editor.getCss();
        console.log(htmldata);
        console.log(cssdata);
      }
      //send to the backend
      });
      

      editor.BlockManager.add('input-label-block', {
        label: 'Input Label',
        category: 'Styled Components',
        content: `
          <div class="input-label-block">
            <div class="input-label-row">
              <label class="input-label" for="name">Name:</label>
              <input class="input-field" type="text" id="name">
            </div>
          </div>
        `,
      });
  
      // Styled FAQ Block
      editor.BlockManager.add('styled-faq', {
        label: 'Styled FAQ',
        category: 'Styled Components',
        content: `
          <div class="styled-faq">
            <h2 class="faq-heading">Frequently Asked Questions</h2>
            <div class="faq-item">
              <h3>Question 1:</h3>
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

