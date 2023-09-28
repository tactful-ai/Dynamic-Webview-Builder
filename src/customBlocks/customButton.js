export const customButton = (editor) => {
  const buttonType = "custom-button";
  
  const script = function () {  
    const handleHttpRequestAction = async (actionURL, method, form,token,customHeaders,params) => {
      const formData = {};
      const pramsData = {};
      const inputs = form.querySelectorAll("input, select, textarea");

      inputs.forEach(function (input) {
        const name = input.name;
        const value = input.value;
        const sendInBody = input.getAttribute('sendinbody');

        if (name && value && sendInBody=='true') {
          formData[name] = value;
        }
        else if(name && value && sendInBody =='false' ){
          pramsData[name]= value;
        }
      });

      if (params!=="") {
        const lines = params.split(",");
        lines.forEach((line) => {
          const [key, value] = line.split(":");
          if (key && value) {
            pramsData[key.trim()] = value.trim();
          }
        });
      }

      let finalURL = actionURL;
      
      if (token!=="") {
        finalURL += `?token=${token}`;
      }
      
      if (pramsData) {
        const params = new URLSearchParams(pramsData);
        finalURL += `&${params.toString()}`;
      }
      let headers = {
        "Content-Type": "application/json",
        "X-API-KEY": `Bearer ${token}`,
      };

      if (customHeaders) {
        const lines = customHeaders.split(",");
        lines.forEach((line) => {
          const [key, value] = line.split(":");
          if (key && value) {
            headers[key.trim()] = value.trim();
          }
        });
      }    
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
        alert("Request succeeded:", data);
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
        const params = this.getAttribute("params");
        
        if (action === "alert") {
          alert(actionURL);
        } else if (action === "handleHttpRequest" && method && actionURL) {
          const form = this.parentElement;
          await handleHttpRequestAction(actionURL, method, form,token,customHeaders,params);
        }
      })
    }
    })
  };
  

  editor.DomComponents.addType(buttonType, {
    isComponent: el => el.tagName == 'BUTTON',
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
        params:"",
        traits: [
          {
            name: "text",
            changeProp: true,
          },
          {
            type: 'select',
            name: 'type',
            label:'Type',
            options: [ 
              { value: 'button', name: 'button'},
              { value: 'submit', name: 'submit'},
              { value: 'reset', name: 'reset'},
            ]
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
          },
          {
            name: "params",
            label: "Params",
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

};
