export const customSelect = (editor) => {
    const selectType = "custom-select";
    editor.DomComponents.addType(selectType, {
      isComponent: (el) => el.tagName == 'SELECT',
      model: {
        defaults: {
          tagName: "select",
          name: "",
          sendinbody: false, 
          traits: [
            {
              name: "name",
              label: "Name",
              type: "text",
            },
            {
              name: "sendinbody",
              label: "Send in Body",
              type: "checkbox",
              valueTrue: 'true',
              valueFalse: 'false',
              default: 'false',
            },
            {
              name: "options",
              label: "Options",
              type: "select-options", 
              options: [
                { value: "option1", name: "Option 1" },
                { value: "option2", name: "Option 2" },
                { value: "option3", name: "Option 3" },
              ],
            },
          ],
        },
      },
    });
  };
  