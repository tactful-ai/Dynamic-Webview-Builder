export const faqContent = (editor) => {
  // Function to fetch FAQ data to display on canvas
  const fetchFAQData = (url,questionKey,answerKey) => {
    if (url) {
      return fetch(url)
        .then((response) => response.json())
        .then((data) => {
          // Process FAQ data and set the component's content
          generateFAQContent(data,questionKey,answerKey);
        })
        .catch((error) => {
          console.error("Error fetching FAQ data:", error);
        });
    }
  };

  // Function to generate FAQ content to display on canvas
  function generateFAQContent(data,questionKey,answerKey) {
    // Generate HTML content for displaying FAQ items
    if (!Array.isArray(data)) {
      console.error('Data is not in the expected format (not an array)');
      return;
    }

    let content = "<div>";
    data.forEach((item) => {
      content += `<div class="faq-item">
    <h3 id="faq-ques" class="faq-ques" >${item[questionKey]}</h3>
    <p id="faq-ans" class="faq-ans"> ${item[answerKey]}</p>
    </div>`;
    });
    content += "</div>";
    console.log("content 1",content);

    return content;
  }

  const script = function (props) {
    const fetchFAQData = (url,questionKey,answerKey) => {
      if (url) {
        return fetch(url)
          .then((response) => response.json())
          .then((data) => {
            generateFAQContent(data,questionKey,answerKey);
          })
          .catch((error) => {
            console.error("Error fetching FAQ data:", error);
          });
      }
    };
    
    function generateFAQContent(data,questionKey,answerKey) {
      if (!Array.isArray(data)) {
        console.error('Data is not in the expected format (not an array)');
        return;
      }

      let content = "<div>";
      data?.forEach((item) => {
        if (typeof item !== 'object') {
          console.error('Item is not in the expected format (not an object)');
          return;
        }
        content += `<div class="faq-item">  
        <h3 id="faq-ques" class="faq-ques" >${item[questionKey]}</h3>
        <p id="faq-ans" class="faq-ans" >${item[answerKey]}</p>
    </div>`;
      });
      const els = document.querySelectorAll(".faq-component");
      Array.prototype.forEach.call(els, (_, idx) => {
        document.getElementsByClassName("faq-component")[idx].innerHTML =
          content;
      });
      console.log("content 2 in generate",content);
    }

    fetchFAQData(props.apiUrl,props.questionKey,props.answerKey);

    window.addEventListener("load", () => {
      fetchFAQData(props.apiUrl,props.questionKey,props.answerKey);
    });
  };

  //Component type
  editor.DomComponents.addType("faq-component", {
    model: {
      defaults: {
        script,
        apiUrl: "http://localhost:3001/faq",
        questionKey:"",
        answerKey:"",
        traits:[ 
          {
            name: "apiUrl",
            label: "API URL",
            type: "text",
            changeProp: true,
          },        
        {
          name: "questionKey",
          label: "Question Key",
          type: "text",
          changeProp: true,
        },
        {
          name: "answerKey",
          label: "Answer Key",
          type: "text",
          changeProp: true,
        },],
        "script-props": ["fetchFAQData", "apiUrl","questionKey","answerKey"],
      },
    },
    view: {
      async onRender({ model }) {
        const url = model.get("apiUrl");
        const questionKey = model.get("questionKey");
        const answerKey = model.get("answerKey");

        const content = await fetchFAQData(url,questionKey,answerKey);

        this.model.components(content);
      },
    },
  });

  //Adding Component
  editor.BlockManager.add("faq-block", {
    label: "FAQ Block",
    category: "Dynamic Blocks",
    content: "<div id='faq-component' class='faq-component' data-gjs-type='faq-component'>Fetching</div>",

    // content: {
    //   type: "faq-component",
    // },
  });
};
