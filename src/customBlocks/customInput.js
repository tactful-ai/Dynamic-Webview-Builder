export const customInput = (editor) => {
    const inputType = "custom-input";
  
    editor.DomComponents.addType(inputType, {
        isComponent: el => el.tagName == 'INPUT',
      model: {
        defaults: {
          tagName: "input",
          attributes: { type: "text" },
          placeholder: "Enter text...",
          name: "",           
          type: "text",        
          required: false,     
          traits: [
            {
              name: "name",
              label: "Name",
              type: "text",
            },
            {
              name: "placeholder",
              label: "Placeholder",
              type: "text",
            },
            {
              name: "type",
              label: "Type",
              type: "select",
              options: [
                { id: 'text', name: 'Text'},
                { id: 'email', name: 'Email'},
                { id: 'password', name: 'Password'},
                { id: 'number', name: 'Number'},
              ],
            },
            {
              name: "required",
              label: "Required",
              type: "checkbox",
            },
            {
              name: "sendinbody",
              label: "Send in Body",
              type: "checkbox",
              valueTrue: 'true',
              valueFalse: 'false',
              default:'false'
            },
          ],
        },
      },
    });  
  };
  