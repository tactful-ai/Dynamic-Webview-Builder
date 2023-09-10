export const customText = (editor) => {
  const fetchText = (url) => {
    if (url) {
      return fetch(url)
        .then((response) => response.json())
        .then((data) => {
          const content = generateText(data);
          return content;
        })
        .catch((error) => {
          console.error("Error fetching FAQ data:", error);
        });
    }
  };
  function generateText(data) {
    let content = '<div class="custom-text">';
    data?.forEach((item) => {
      content += `<div class="text-item">  
      <p id="text-paragraph" class="text-paragraph" >${item.text}</p>
    </div>`;
    });
    content += "</div>";
    return content;
  }

  const script = function (props) {
    const fetchText = (url) => {
      if (url) {
        return fetch(url)
          .then((response) => response.json())
          .then((data) => {
            generateText(data);
          })
          .catch((error) => {
            console.error("Error fetching text:", error);
          });
      }
    };

    function generateText(data) {
      let content = "";
      data?.forEach((item) => {
        content += `<div class="text-item">  
        <p id="text-paragraph" class="text-paragraph" >${item.text}</p>
      </div>`;
      });
      const els = document.querySelectorAll(".custom-text");
      Array.prototype.forEach.call(els, (_, idx) => {
        document.getElementsByClassName("custom-text")[idx].innerHTML = content;
      });
    }

    window.addEventListener("load", (event) => {
      fetchText(props.apiUrl);
    });
  };

  // Custom text component that fetches content from an API
  editor.DomComponents.addType("custom-text-component", {
    model: {
      defaults: {
        script,
        apiUrl: "http://localhost:3001/faq/custom-text",
        content: "",
        "script-props": ["fetchText", "apiUrl"],
      },
    },
    view: {
      async onRender({ model }) {
        const url = model.get("apiUrl");
        const content = await fetchText(url);
        const component = editor.addComponents(content);
        return component;
      },
    },
  });
  // Adding Custom Text Component
  editor.BlockManager.add("custom-text-block", {
    label: "Custom Text",
    category: "Custom Components",
    content: {
      type: "custom-text-component",
    },
  });
};
