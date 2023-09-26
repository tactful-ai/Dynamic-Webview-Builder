export const faqContent = (editor) => {
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
    data.forEach((item) => {
      content += `<div class="faq-item">
    <h3 id="faq-ques" class="faq-ques" >${item[questionKey]}</h3>
    <p id="faq-ans" class="faq-ans"> ${item[answerKey]}</p>
    </div>`;
    });
    content += "</div>";
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

  editor.BlockManager.add("faq-block", {
    label: "FAQ Block",
    category: "Dynamic Blocks",
    attributes: { class: "fa fa-comments-o" },
    content: "<div id='faq-component' class='faq-component' data-gjs-type='faq-component'>Fetching</div>",

    // content: {
    //   type: "faq-component",
    // },
  });
};
