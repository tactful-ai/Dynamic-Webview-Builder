export const customButton = (editor) => {
  const buttonType = "custom-button";
  
  const script = function (props) {
    const actionURL = props.url;
    const method = props.method;
    const action = props.actions;

    const handleAlertAction = (actionURL) => {
      alert(actionURL);
    };
    
    const handleHttpRequestAction = async (actionURL, method, form) => {
      const formData = {};
      const inputs = form.querySelectorAll("input, select, textarea");
    
      inputs.forEach(function (input) {
        const name = input.name;
        const value = input.value;
    
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
    
      try {
        const response = await fetch(actionURL, requestOptions);
        if (!response.ok) {
          if (response.status === 0) {
            throw new Error("Network error: CORS policy may be blocking the request.");
          } else {
            throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
          }
        }
    
        const data = await response.json();
        console.log("Request succeeded:", data);
      } catch (error) {
        console.error("There was a problem with the request:", error);
      }
    };  
  
    document.getElementById("custom-button").addEventListener("click", async function () {
      if (action === "alert") {
        handleAlertAction(actionURL);
      } else if (action === "handleHttpRequest" && method && actionURL) {
        const form = document.getElementById("custom-button").parentElement;
        await handleHttpRequestAction(actionURL, method, form);
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
        actions: "handleHttpRequest",
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
              { value: "alert", name: "alert" },
              { value: "handleHttpRequest", name: "handleHttpRequest" },
            ],
            changeProp: true,
          },
          {
            name: "url",
            label: "URL/Alert message",
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
