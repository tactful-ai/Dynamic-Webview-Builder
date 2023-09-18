export const customButton = (editor) => {
  const buttonType = "custom-button";
  
  const script = function () {   
     
    const handleHttpRequestAction = async (actionURL, method, form,token,customHeaders) => {
      const formData = {};
      const pramsData = {};
      const inputs = form.querySelectorAll("input, select, textarea");

      inputs.forEach(function (input) {
        const name = input.name;
        const value = input.value;
        const sendInBody = input.getAttribute('sendinbody');
        console.log("name",name)
        console.log("value",value)
        console.log("sendInBody",sendInBody)

        if (name && value && sendInBody=='true') {
          formData[name] = value;
        }
        else if(name && value && sendInBody =='false' ){
          pramsData[name]= value;
        }
      });
      console.log(formData)
      console.log("pramsData",pramsData)


      let finalURL = actionURL;
      
      if (token) {
        // Append token to the URL
        finalURL += `?token=${token}`;
      }
      
      if (pramsData) {
        const params = new URLSearchParams(pramsData);
        console.log(pramsData)
        finalURL += `?${params.toString()}`;
      }
      console.log("finalURL",finalURL)
      let headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      };

      // Parse and add custom headers
      if (customHeaders) {
        const lines = customHeaders.split(",");
        lines.forEach((line) => {
          const [key, value] = line.split(":");
          if (key && value) {
            headers[key.trim()] = value.trim();
          }
        });
      }
      console.log(headers)
    
      const requestOptions = {
        method: method,
        headers: headers,
        body: method === "POST"? JSON.stringify(formData) : null,
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
    customButtons.forEach((button) => {
      if(button.getAttribute('listener') !== 'true'){
        button.addEventListener("click", async function () {

        button.setAttribute('listener', 'true');

        const actionURL = this.getAttribute("url");
        const method = this.getAttribute("method");
        const action = this.getAttribute("actions");
        const token = this.getAttribute("token");
        const customHeaders = this.getAttribute("customHeaders");
        
        if (action === "alert") {
          alert(actionURL);
        } else if (action === "handleHttpRequest" && method && actionURL) {
          const form = this.parentElement;
          await handleHttpRequestAction(actionURL, method, form,token,customHeaders);
        }
      })
    }
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
            name: "token",
            label: "Token",
            type: "text",
          },
          {
            name: "customHeaders",
            label: "Custom Headers",
            type: "textarea",
          }
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
