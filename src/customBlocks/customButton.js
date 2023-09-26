import { message } from "antd";

export const customButton = (editor) => {
  const buttonType = "custom-button";
  
  const script = function () {  
    const ticketPayload = {
      id: 0, // You can generate a unique ID or use a placeholder value
      created_on: "2019-08-24T14:15:22Z",
      updated_on: "2019-08-24T14:15:22Z",
      due_on: "2019-08-24T14:15:22Z",
      first_response_on: "2019-08-24T14:15:22Z",
      resolved_on: "2019-08-24T14:15:22Z",
      external_id: "string",
      type: "string",
      subject: "string",
      description: "string",
      priority: "string",
      status: "string",
      group: "string",
      tags: "string",
      source: "string",
      related_item_url: "string",
      related_item_id: "string",
      custom_fields: "string",
      satisfaction_rating: "string",
      brand: "string",
      requester_id: 0,
      external_requester_id: 0,
      assignee_id: 0,
      external_assingee_email: "string",
      reporter_id: 0,
      external_reporter_email: "string",
      profile_id: 0,
      display_id: 0,
      channel_id: "string",
      attachments: ["string"],
      links: ["string"],
      comments: [
        {
          created_on: "2018-01-01T00:00:00Z",
          agent_id: 1,
          comment: "This is a comment",
          id: 112121,
        },
      ],
      requester: {
        id: 0,
        facebook_id: "string",
        twitter_id: "string",
        google_id: "string",
        nick_name: "string",
        whatsapp_number: "string",
        facebook_name: "string",
        webchat_id: "string",
        email: "string",
        name: "string",
        age_range: 0,
        gender: "string",
        active: true,
        confirmed: true,
        phone_number: "string",
        signup_at: "2019-08-24T14:15:22Z",
        verified_phone_number: true,
        preferred_language: "string",
        country: "string",
        city: "string",
        area: "string",
        address_details: "string",
        branch_id: 0,
        external_id: "string",
        group: "string",
        last_login: "2019-08-24T14:15:22Z",
        last_seen: "2019-08-24T14:15:22Z",
        last_sent_message: "2019-08-24T14:15:22Z",
        sessions_count: 0,
        tags: "string",
        profile_pic: "string",
        profile_id: 0,
        channel_id: "string",
        created_at: "2019-08-24T14:15:22Z",
        organization: "string",
        title: "string",
        department: "string",
        manager_id: 0,
        extension: "string",
        time_zone: "string",
        updated_at: "2019-08-24T14:15:22Z",
        verified: true,
        custome_field: {},
      },
    };
         
    const handleCreateTicket = async (actionURL, method, form,token,customHeaders,params) => {
      const pramsData = {};
      const inputs = form.querySelectorAll("input, select, textarea");

      inputs.forEach(function (input) {
        const name = input.name;
        const value = input.value;
        const sendInBody = input.getAttribute('sendinbody');

        if (name && value && sendInBody=='true') {
          ticketPayload[name] = value;
        }
        else if(name && value && sendInBody =='false' ){
          pramsData[name]= value;
        }
      });

      if (params) {
        const lines = params.split(",");
        lines.forEach((line) => {
          const [key, value] = line.split(":");
          if (key && value) {
            pramsData[key.trim()] = value.trim();
          }
        });
      }
      let finalURL = actionURL;
      
      // if (pramsData) {
      //   const params = new URLSearchParams(pramsData);
      //   // console.log(pramsData)
      //   finalURL += `&${params.toString()}`;
      // }

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
      // console.log(headers)
    
      const requestOptions = {
        method: method,
        headers: headers,
        body: method === "POST"? JSON.stringify(ticketPayload) : null,
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
        message.success("Request succeeded:", data);
      } catch (error) {
        message.error("There was a problem with the request:", error);
      }
    };  

    const handleHttpRequestAction = async (actionURL, method, form,token,customHeaders,params) => {
      const formData = {};
      const pramsData = {};
      const inputs = form.querySelectorAll("input, select, textarea");

      inputs.forEach(function (input) {
        const name = input.name;
        const value = input.value;
        const sendInBody = input.getAttribute('sendinbody');
        // console.log("name",name)
        // console.log("value",value)
        // console.log("sendInBody",sendInBody)

        if (name && value && sendInBody=='true') {
          formData[name] = value;
        }
        else if(name && value && sendInBody =='false' ){
          pramsData[name]= value;
        }
      });

      if (params) {
        const lines = params.split(",");
        lines.forEach((line) => {
          const [key, value] = line.split(":");
          if (key && value) {
            pramsData[key.trim()] = value.trim();
          }
        });
      }

      // console.log(formData)
      // console.log("pramsData",pramsData)


      let finalURL = actionURL;
      
      if (token) {
        // Append token to the URL
        finalURL += `?token=${token}`;
      }
      
      if (pramsData) {
        const params = new URLSearchParams(pramsData);
        // console.log(pramsData)
        finalURL += `&${params.toString()}`;
      }
      // console.log("finalURL",finalURL)
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
      // console.log(headers)
    
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
        message.success("Request succeeded:", data);
      } catch (error) {
        message.error("There was a problem with the request:", error);
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
        else if (action === "handleCreateTicketRequest" && method && actionURL) {
          const form = this.parentElement;
          await handleCreateTicket(actionURL, method, form,token,customHeaders,params);
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
              { value: "handleCreateTicketRequest", name: "handleCreateTicketRequest" },

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
