export const customButton = (editor) => {
  const buttonType = "custom-button";

  const script = function (props) {
    const actionURL = props.url;
    const method = props.method;
    const action = props.actions;

    const handleResponse = (response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    };
    document
      .getElementById("custom-button")
      .addEventListener("click", function () {
        if (action === "alert") {
          alert(actionURL);
        } else {
          if (method === "POST" && actionURL) {
            var form = document.getElementById("custom-button").parentElement;

            var formData = {};
            var inputs = form.querySelectorAll("input, select, textarea");
            inputs.forEach(function (input) {
              var name = input.name;
              var value = input.value;
        
              if (name && value) {
                formData[name] = value;
              }
            });
        
            const requestOptions = {
              method: method,
              headers: {
                "Content-Type": "application/json",
              },
              body: method === "POST" ? JSON.stringify(formData) : null,
            };
            console.log("requestOptions",requestOptions)
            fetch(actionURL, requestOptions)
              .then(handleResponse)
              .then((data) => {
                console.log("POST Request succeeded:", data);
                return data;
              })
              .catch((error) => {
                console.error(
                  "There was a problem with the POST request:",
                  error
                );  
                throw error;
              });
          } else if (method === "GET" && actionURL) {
            fetch(actionURL)
              .then(handleResponse)
              .then((data) => {
                console.log("GET Request succeeded:", data);
                return data;
              })
              .catch((error) => {
                console.error(
                  "There was a problem with the GET request:",
                  error
                );
                throw error;
              });
          }
        }
      });
  };

  editor.DomComponents.addType(buttonType, {
    model: {
      defaults: {
        script,
        tagName: "button",
        attributes: { type: "button" },
        text: "Send",
        actions: "",
        url: "",
        method: "GET",
        traits: [
          {
            name: "text",
            changeProp: true,
          },
          {
            name: "actions",
            label: "Actions",
            type: "select",
            options: [
              { value: "eval", name: "Execute" },
              { value: "handleHttpRequest", name: "handleHttpRequest" },
            ],
            changeProp: true,
          },
          {
            name: "url",
            label: "URL",
            type: "text",
            changeProp: true,
          },
          {
            name: "method",
            label: "HTTP Method",
            type: "select",
            options: [
              { value: "GET", name: "GET" },
              { value: "POST", name: "POST" },
            ],
            changeProp: true,
          },
        ],
        "script-props": ["url", "method", "actions"],
      },
      init: function () {
        const comps = this.components();
        const tChild = comps.length === 1 && comps.models[0];
        const chCnt =
          (tChild && tChild.is("textnode") && tChild.get("content")) || "";
        const text = chCnt || this.get("text");
        this.set("text", text);
        this.on("change:text", this.__onTextChange);
        text !== chCnt && this.__onTextChange();
      },
      __onTextChange: function () {
        this.components(this.get("text"));
      },
    },
  });

  editor.BlockManager.add(buttonType, {
    label: "Custom Button",
    category: "Custom Components",
    attributes: { class: "fa fa-square" },
    content: `<button data-gjs-type="${buttonType}" id='custom-button' data-gjs-name="Custom Button">Click Me</button>`,
  });
};
