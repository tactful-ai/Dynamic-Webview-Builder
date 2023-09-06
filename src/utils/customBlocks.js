export const defineCustomBlocks = (editor) => {
  const editorBlockManager = editor.BlockManager;

  //form components
  const textBlock = editorBlockManager.get('text');
  textBlock.set({
    label: 'Text',
    content: `
        <p style="font-family:sans-serif;">Insert your Text here</p>
        `,
  });

  const inputBlock = editorBlockManager.get('input');
  inputBlock.set({
    label: 'Input',
    content: `
      <div class="input-container">
      <input style="display: inline-block; width: 75%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; background-color: rgba(0,0,0,0);"></input>
      </div>`,
  });

  const textareaBlock = editorBlockManager.get('textarea');
  textareaBlock.set({
    label: 'Textarea',
    content: `
      <div class="textarea-container">
      <textarea style="display: inline-block; width: 75%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; background-color: rgba(0,0,0,0);"></textarea>
      </div>`,
  });

  const selectBlock = editorBlockManager.get('select');
  selectBlock.set({
    label: 'Select',
    content: `
      <div class="select-container">
      <select style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; background-color: rgba(0,0,0,0); cursor: pointer;">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
      </div>`,
  });

  const buttonBlock = editorBlockManager.get('button');
  buttonBlock.set({
    label: 'Button',
    content: `
        <button style="background-color: green; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer;">
        Click Me
        </button>`,
  });

  const radioBlock = editorBlockManager.get('radio');
  radioBlock.set({
    label: 'Radio',
    content: `
      <input type="radio" style="width: 16px; height: 16px; border: 1px solid #ccc; border-radius: 50%; background-color: rgba(0,0,0,0); margin-right: 8px; display: inline; position: relative; cursor: pointer;">
    `,
  });

  const formBlock = editor.BlockManager.get('form');
  formBlock.set({
    label: 'Styled Form Block',
    content: `
        <form style="display: flex; flex-direction: column; align-items: center; border: 1px solid #ccc; border-radius: 4px; background-color: #f5f5f5; padding: 20px;">
        <div style="display: flex; flex-direction: row; align-items: center; margin-bottom: 10px;">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" style="background-color: rgba(0,0,0,0); padding: 8px; border: 1px solid #ccc; border-radius: 4px; margin-right: 10px;" required>
        </div>

        <div style="display: flex; flex-direction: row; align-items: center; margin-bottom: 10px;">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" style="background-color: rgba(0,0,0,0); padding: 8px; border: 1px solid #ccc; border-radius: 4px; margin-right: 10px;" required>
        </div>

        <div style="display: flex; flex-direction: row; align-items: center; margin-bottom: 10px;">
        <label for="gender">Gender:</label>
        <select id="gender" name="gender" style="background-color: rgba(0,0,0,0); padding: 8px; border: 1px solid #ccc; border-radius: 4px; margin-right: 10px;">
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
        </select>
        </div>

        <div style="display: flex; flex-direction: row; align-items: center; margin-bottom: 10px;">
        <label for="message">Message:</label>
        <textarea id="message" name="message" style="background-color: rgba(0,0,0,0); padding: 8px; border: 1px solid #ccc; border-radius: 4px; margin-right: 10px;" required></textarea>
        </div>

        <button type="submit" style="background-color: green; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer;">Submit</button>
        </form>
    `,
  });

  editorBlockManager.add('input-label-block', {
    label: 'Input Label',
    category: 'Styled Components',
    content: `
        <div class="input-label-block" >
          <div class="input-label-row">
            <label class="input-label" for="name">Name:</label>
            <input class="input-field" type="text" id="name">
          </div>
        </div>
      `,
  });

  editorBlockManager.add('styled-faq', {
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

  function handleHttpRequest(actionURL, method, data = null) {
    // Define fetch options
    const requestOptions = {
      method: method,
      headers: {
        'Content-Type': 'application/json', // Set the appropriate content type
      },
      // Include the request body for POST requests
      body: method === 'POST' ? JSON.stringify(data) : null,
    };

    // Perform the HTTP request
    return fetch(actionURL, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Handle the response here
        return response.json(); // If expecting JSON response
      })
      .then((data) => {
        // Handle the data from the response
        console.log('Request succeeded:', data);
        return data;
      })
      .catch((error) => {
        // Handle errors here
        console.error('There was a problem with the fetch operation:', error);
        throw error; // Rethrow the error for further handling
      });
  }
  const buttonType = 'custom-button';

  editor.DomComponents.addType(buttonType, {
    isComponent: function (el) {
      return el.tagName == 'BUTTON';
    },

    model: {
      defaults: {
        script: handleHttpRequest,
        tagName: 'button',
        attributes: { type: 'button' },
        text: 'Send',
        onclick: '',
        url: '',
        method: 'GET',
        traits: [
          {
            name: 'text',
            changeProp: true,
          },
          {
            type: 'select',
            name: 'type',
            options: [
              { value: 'button' },
              { value: 'submit' },
              { value: 'reset' },
            ],
          },
          {
            name: 'actions',
            label: 'Actions',
            type: 'select',
            options: [
              { value: 'eval', name: 'eval' },
              { value: 'handleHttpRequest', name: 'handleHttpRequest' },
            ],
            changeProp: true,
          },
          {
            name: 'url',
            label: 'URL',
            type: 'text',
            changeProp: true,
          },
          {
            name: 'method',
            label: 'HTTP Method',
            type: 'select',
            options: [
              { value: 'GET', name: 'GET' },
              { value: 'POST', name: 'POST' },
            ],
            changeProp: true,
          },
        ],
        // 'script-props': ['onclick', 'method'],
      },
      init: function () {
        const comps = this.components();
        const tChild = comps.length === 1 && comps.models[0];
        const chCnt =
          (tChild && tChild.is('textnode') && tChild.get('content')) || '';
        const text = chCnt || this.get('text');
        this.set('text', text);
        this.on('change:text', this.__onTextChange);
        text !== chCnt && this.__onTextChange();

        this.on('change:actions change:url change:method', () => {
          console.log('change inshallah');
          this.updateOnclickAttribute();
        });
      },
      __onTextChange: function () {
        this.components(this.get('text'));
      },
      updateOnclickAttribute: function () {
        console.log('I am in Update inshallah');
        const actionsTrait = this.get('actions');
        const urlTrait = this.get('url');
        const methodTrait = this.get('method');

        this.set('url', urlTrait);
        this.set('method', methodTrait);

        /* const component = editor.getSelected();
        component.addTrait(
          {
            name: 'onclick',
            value: '',
          },
          { at: 0 }
        ); */

        // Depending on the selected action, set the onclick attribute
        /* if (actionsTrait === 'eval') {
          component.getTrait('onclick').set({ value: `eval(${urlTrait})` });
        } else if (
          actionsTrait === 'handleHttpRequest' &&
          urlTrait &&
          methodTrait
        ) {
          component.getTrait('onclick').set({
            value: `handleHttpRequest('${urlTrait}', '${methodTrait}')`,
          });
        } else {
          // Default to an empty onclick attribute
          component.getTrait('onclick').set({ value: '' });
        } */
      },
    },

    view: {
      events: {
        'click button': 'handleButtonClick',
      },

      handleButtonClick: function (event) {
        handleHttpRequest(this.model.get('url'), this.model.get('method'));
        //const onclickCode = this.model.getTrait('onclick');

        console.log(
          'Onclick action:',
          // editor.getSelected.getTrait('onclick'),
          //{ onclickCode },
          this.model.get('url'),
          this.model.get('method'),
          event
        );

        /* if (onclickCode) {
          console.log('Onclick action:', onclickCode);
          eval(onclickCode);
        } */
      },
    },
  });

  editorBlockManager.add(buttonType, {
    label: 'Custom Button',
    attributes: { class: 'fa fa-square' }, // You can specify an icon here
    content: `<button data-gjs-type="${buttonType}"  data-gjs-name="Custom Button">Click Me</button>`,
  });
};
