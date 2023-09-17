export const faqContent = (editor) => {
  // Function to fetch FAQ data to display on canvas
  const fetchFAQData = (url) => {
    let content;
    if (url) {
      return fetch(url)
        .then((response) => response.json())
        .then((data) => {
          // Process FAQ data and set the component's content
          content = generateFAQContent(data);
          return content;
        })
        .catch((error) => {
          console.error("Error fetching FAQ data:", error);
        });
    }
  };

  // Function to generate FAQ content to display on canvas
  function generateFAQContent(data) {
    // Generate HTML content for displaying FAQ items
    let content = '<div class="faq-component">';
    data.forEach((item) => {
      content += `<div class="faq-item">
    <h3 id="faq-ques" class="faq-ques" >${item.question}</h3>
    <p id="faq-ans" class="faq-ans"> ${item.answer}</p>
    </div>`;
    });
    content += "</div>";
    return content;
  }

  const script = function (props) {
    const fetchFAQData = (url) => {
      if (url) {
        return fetch(url)
          .then((response) => response.json())
          .then((data) => {
            generateFAQContent(data);
          })
          .catch((error) => {
            console.error("Error fetching FAQ data:", error);
          });
      }
    };
    function generateFAQContent(data) {
      let content = "";
      data?.forEach((item) => {
        content += `<div class="faq-item">  
        <h3 id="faq-ques" class="faq-ques" >${item.question}</h3>
        <p id="faq-ans" class="faq-ans" >${item.answer}</p>
    </div>`;
      });
      const els = document.querySelectorAll(".faq-component");
      Array.prototype.forEach.call(els, (_, idx) => {
        document.getElementsByClassName("faq-component")[idx].innerHTML =
          content;
      });
    }

    window.addEventListener("load", () => {
      fetchFAQData(props.apiUrl);
    });
  };

  //Component type
  editor.DomComponents.addType("faq-component", {
    model: {
      defaults: {
        script,
        apiUrl: "http://localhost:3001/faq",
        content: "",
        "script-props": ["fetchFAQData", "apiUrl"],
      },
    },
    view: {
      async onRender({ model }) {
        const url = model.get("apiUrl");
        const content = await fetchFAQData(url);

        const component = editor.addComponents(content);
        return component;
      },
    },
  });

  //Adding Component
  editor.BlockManager.add("faq-block", {
    label: "FAQ Block",
    category: "Dynamic Blocks",
    content: {
      type: "faq-component",
    },
  });
};
