export const customButton =(editor)=>{
    const buttonType = 'custom-button';

    const script =function(props){
     const actionURL = props.url;
     const method = props.method;
     const data =null;
     const action = props.actions;
     const requestOptions = {
      method: method,
      headers: {
        'Content-Type': 'application/json', // Set the appropriate content type
      },
      // Include the request body for POST requests
      body: method === 'POST' ? JSON.stringify(data) : null,
    };
  
      document.getElementById('custom-button').addEventListener('click',
      function (){
        if(action == "eval"){
          eval(actionURL)
         }
         else{
          fetch(actionURL, requestOptions)
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
      }
      )
  
    };
    editor.DomComponents.addType(buttonType, {
      isComponent: function (el) {
        return el.tagName == 'BUTTON';
      },
  
      model: {
        defaults: {
          script,
          tagName: 'button',
          attributes: { type: 'button' },
          text: 'Send',
          actions: '',
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
              changeProp: true,
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
          'script-props': ['url', 'method','actions'],
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
        },
        __onTextChange: function () {
          this.components(this.get('text'));
        },
      },
    });
  
    editor.BlockManager.add(buttonType, {
      label: 'Custom Button',
      category: "Dynamic Blocks",
      attributes: { class: 'fa fa-square' },
      content: `<button data-gjs-type="${buttonType}" id='custom-button' data-gjs-name="Custom Button">Click Me</button>`,
    });
}