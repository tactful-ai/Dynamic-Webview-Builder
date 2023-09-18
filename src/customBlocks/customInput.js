export const customInput = (editor) => {
    const inputType = "custom-input";
  
    // const script = function () {
    //   const customInputs = document.querySelectorAll(".custom-input");
  
    //   customInputs.forEach((input) => {
    //     input.addEventListener("change", function () {
    //       const inputValue = this.value;
    //       const sendInBody = this.getAttribute("sendinbody");
  
    //       // Depending on the sendInBody checkbox value, you can include the input
    //       // either in the request body or URL parameters.
    //       if (sendInBody === "true") {
    //         // Include the input in the request body
    //         console.log("Sending input in the request body:", inputValue);
    //       } else {
    //         // Include the input in the URL parameters
    //         console.log("Sending input as a URL parameter:", inputValue);
    //       }
    //     });
    //   });
    // };
  
    editor.DomComponents.addType(inputType, {
        isComponent: el => el.tagName == 'INPUT',
      model: {
        defaults: {
          tagName: "input",
          attributes: { type: "text" },
          placeholder: "Enter text...",
          name: "",            // Default value for the Name trait
          type: "text",        // Default value for the Type trait
          required: false,     // Default value for the Required trait
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
  
    editor.BlockManager.add(inputType, {
      label: "Custom Input",
      category: "Custom Components",
      attributes: { class: "fa fa-font" },
      content: `<input data-gjs-type="${inputType}" class="custom-input" data-gjs-name="Custom Input" placeholder="Enter text...">`,
    });
  };
  