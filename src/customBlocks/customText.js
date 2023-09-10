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
  // Function to generate text based on the ID
  function generateText(data) {
    const textMap = {};

    // Map IDs to their corresponding text values
    data?.forEach((item) => {
      textMap[item.id] = item.text;
    });

    let content = '<div class="custom-text">';
    Object.entries(textMap).forEach(([id, text]) => {
      content += `<div class="text-item">  
        <p id="text-paragraph" class="text-paragraph" >${text}</p>
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
        const id = item.id;
        const text = item.text;
        content += `<div class="text-item">  
      <p id="text-paragraph-${id}" class="text-paragraph" >${text}</p>
    </div>`;
      });
      content += "</div>";
      return content;
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
    label: "Custom Text Block",
    category: "Custom Components",
    content: {
      type: "custom-text-component",
    },
  });
};
