export const customButton = (editor) => {
  const buttonType = "custom-button";
  
  const script = function () {   
     
    const handleHttpRequestAction = async (actionURL, method, form,sendParams,token) => {
      const formData = {};
      const inputs = form.querySelectorAll("input, select, textarea");
    
      inputs.forEach(function (input) {
        const name = input.name;
        const value = input.value;
    
        if (name && value) {
          formData[name] = value;
        }
      });

      let finalURL = actionURL;
      
      if (sendParams) {
        const params = new URLSearchParams(formData);
        finalURL += `?${params.toString()}`;
      }
      console.log("finalURL",finalURL)
    
      const requestOptions = {
        method: method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,

        },
        body: method === "POST" && !sendParams? JSON.stringify(formData) : null,
      };
    
      try {
        const response = await fetch(finalURL, requestOptions);
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

    const customButtons = document.querySelectorAll(".custom-button");
    console.log(customButtons.length)
    customButtons.forEach((button) => {
        button.addEventListener("click", async function () {
        const actionURL = this.getAttribute("url");
        const method = this.getAttribute("method");
        const action = this.getAttribute("actions");
        const sendParams = this.getAttribute("sendParams");
        const token = this.getAttribute("token");
        if (action === "alert") {
          console.log("alert",actionURL)
          alert(actionURL);
        } else if (action === "handleHttpRequest" && method && actionURL) {
          const form = this.parentElement;
          await handleHttpRequestAction(actionURL, method, form,sendParams,token);
        }
      })
    })
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
        method: "",
        token:"",
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
          },
          {
            name: "url",
            label: "URL/Alert message",
            type: "text",
          },
          {
            name: "method",
            label: "HTTP Method",
            type: "select",
            options: [
              { value: "GET", name: "GET" },
              { value: "POST", name: "POST" },
            ],
          },
          {
            name: "sendParams",
            label: "Send in Params",
            type: "checkbox",
          },
          {
            name: "token",
            label: "Token",
            type: "text",
          },
        ],
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
    content: `<button data-gjs-type="${buttonType}" id="custom-button" class="custom-button" data-gjs-name="Custom Button">Click Me</button>`,
  });
};
