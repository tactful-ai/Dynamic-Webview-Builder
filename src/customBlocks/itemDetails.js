export const itemDetailsBlock = (editor) => {
  // Function to fetch product data to display on canvas
  const fetchProductData = (url) => {
    let content;
    if (url) {
      return fetch(url)
        .then((response) => response.json())
        .then((data) => {
          // Process product data and set the component's content
          content = generateProductContent(data);
          return content;
        })
        .catch((error) => {
          console.error("Error fetching product data:", error);
        });
    }
  };

  // Function to generate product content to display on canvas
  function generateProductContent(data) {
    // Generate HTML content for displaying products
    let content = '<div class="product-component">';
    data.forEach((item) => {
      content += `<div class="product-item">
        <h3 id="product-name" class="product-name">${item.productName}</h3>
        <img id="product-image" class="product-image" src="${item.picture}" alt="${item.productName}" style="width: 375px; height: auto;">
        <p id="product-description" class="product-description">${item.description}</p>
      </div>`;
    });
    content += "</div>";
    return content;
  }

  const script = function (props) {
    const fetchProductData = (url) => {
      if (url) {
        return fetch(url)
          .then((response) => response.json())
          .then((data) => {
            // Process product data and set the component's content
            generateProductContent(data);
          })
          .catch((error) => {
            console.error("Error fetching product data:", error);
          });
      }
    };
    function generateProductContent(data) {
      let content = "";
      data?.forEach((item) => {
        content += `<div class="product-item">  
          <h3 id="product-name" class="product-name">${item.productName}</h3>
          <img id="product-image" class="product-image" src="${item.picture}" alt="${item.productName}" style="width: 375px; height: auto;">
          <p id="product-description" class="product-description">${item.description}</p> 
          </div>`;
      });
      const els = document.querySelectorAll(".product-component");
      Array.prototype.forEach.call(els, (_, idx) => {
        document.getElementsByClassName("product-component")[idx].innerHTML =
          content;
      });
    }

    window.addEventListener("load", () => {
      fetchProductData(props.apiUrl);
    });
  };

  //Component type
  editor.DomComponents.addType("product-component", {
    model: {
      defaults: {
        script,
        apiUrl: "http://localhost:3001/products",
        content: "",
        addButton: true,
        traits: [
          {
            name: "addButton",
            type: "checkbox",
            changeProp: true,
          },
        ],
        "script-props": ["fetchProductData", "apiUrl"],
      },
    },
    view: {
      async onRender({ model }) {
        const url = model.get("apiUrl");
        const content = await fetchProductData(url);
        const component = editor.addComponents(content);
        return component;
      },
    },
  });

  //Adding Component
  editor.BlockManager.add("product-block", {
    label: "Product Block",
    category: "Dynamic Blocks",
    content: {
      type: "product-component",
    },
  });
};
