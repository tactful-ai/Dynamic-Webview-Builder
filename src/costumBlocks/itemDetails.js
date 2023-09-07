export const itemDetailsBlock = (editor) => {
  // Function to fetch product data
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

  const script = function (props) {
    // Function to fetch product data
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

    // Function to handle adding to cart
    function addToCart(productId) {
      const apiEndpoint = props.apiEndpoint;
      const postData = {
        product_id: productId,
      };

      fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      })
        .then((response) => {
          if (response.ok) {
            console.log('Product added to cart successfully');
          } else {
            console.error('Failed to add product to cart');
          }
        })
        .catch((error) => {
          console.error('Error adding product to cart:', error);
        });
    }

    // Function to generate product content
    function generateProductContent(data) {
      // Generate HTML content for displaying products
      let content = "";
      data?.forEach((item) => {
        content += `<div class="product-item">  
          <h3 id="product-name" class="product-name">${item.productName}</h3>
          <img id="product-image" class="product-image" src="${item.picture}" alt="${item.productName}" style="width: 375px; height: auto;">
          <p id="product-description" class="product-description">${item.description}</p>
          <button class="add-to-cart-button" data-product-id="${item.id}">Add to Cart</button>
        </div>`;
      });
        const els = document.querySelectorAll('.product-component');
        console.log("els",els)
        Array.prototype.forEach.call(els, (_, idx) => {
          console.log("elements",document.getElementsByClassName('fproduct-component')[idx])
          document.getElementsByClassName('product-component')[idx].innerHTML = content
        });
        console.log(data);
        console.log(content);

      // Add click event listeners to the "Add to Cart" buttons
      const addToCartButtons = Array.from(els.querySelectorAll('.add-to-cart-button'));
      addToCartButtons.forEach((button) => {
        button.addEventListener('click', () => {
          const productId = button.getAttribute('data-product-id');
          addToCart(productId);
        });
      });
    }

    window.addEventListener("load", () => {
      fetchProductData(props.apiUrl);
    });
  };

  // Function to generate product content OUTSIDE
  function generateProductContent(data) {
    // Generate HTML content for displaying products
    let content = '<div class="product-component">';
    data.forEach((item) => {
      content += `<div class="product-item">
        <h3 id="product-name" class="product-name">${item.productName}</h3>
        <img id="product-image" class="product-image" src="${item.picture}" alt="${item.productName}" style="width: 375px; height: auto;">
        <p id="product-description" class="product-description">${item.description}</p>
        <button class="add-to-cart-button" data-product-id="${item.id}">Add to Cart</button>
      </div>`;
    });
    content += "</div>";
    return content;
  }

  editor.DomComponents.addType("product-component", {
    model: {
      defaults: {
        script,
        apiUrl: "http://localhost:3001/products", // Replace with your products API endpoint
        content: "",
        apiEndpoint: '',
        traits: [
          {
            name: 'apiEndpoint',
            label: 'API Endpoint',
            type: 'text',
            changeProp: true,
          },
        ],
        "script-props": ["fetchProductData", "apiUrl", "apiEndpoint"],
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

  editor.BlockManager.add("product-block", {
    label: "Product Block",
    category: "Dynamic Blocks",
    content: {
      type: "product-component",
    },
  });
};
