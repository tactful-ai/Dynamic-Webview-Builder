export const itemDetailsBlock = (editor) => {
  const apiUrlOptions = [
    { value: "http://localhost:3001/faqItems", name: "Dstny FAQ" },
    { value: "http://localhost:3001/faq", name: "Grapes FAQ" },
    { value: "http://localhost:3001/products", name: "Products" },
  ];
  const fetchProductData = (
    url,
    productNameKey,
    productImgKey,
    productDescriptionKey,
    productRatingKey
  ) => {
    if (url) {
      return fetch(url)
        .then((response) => response.json())
        .then((data) => {
          generateProductContent(
            data,
            productNameKey,
            productImgKey,
            productDescriptionKey,
            productRatingKey
          );
        })
        .catch((error) => {
          console.error("Error fetching product data:", error);
        });
    }
  };

  function addToCart(productId) {
    const apiEndpoint = apiEndpoint;
    const postData = {
      product_id: productId,
    };

    fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Product added to cart successfully");
        } else {
          console.error("Failed to add product to cart");
        }
      })
      .catch((error) => {
        console.error("Error adding product to cart:", error);
      });
  }

  function generateProductContent(
    data,
    productNameKey,
    productImgKey,
    productDescriptionKey,
    productRatingKey
  ) {
    // Check if data is an array
    if (!Array.isArray(data)) {
      console.error("Data is not in the expected format (not an array)");
      return;
    }

    let content = "<div>";
    data?.forEach((item) => {
      if (typeof item !== "object") {
        console.error("Item is not in the expected format (not an object)");
        return;
      }
      content += `<div class="product-item-card" data-product-id="${item.id}" style="border: 1px solid #ccc; border-radius: 5px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); padding: 10px; margin-bottom: 20px; background-color: #fff;">`;
      content += `<h3 id="product-name" class="product-name" style="font-size: 18px; margin-bottom: 10px;">${item[productNameKey]}</h3>`;
      if (productImgKey) {
        content += `<img id="product-image" class="product-image" src="${item[productImgKey]}" alt="${item[productNameKey]}" style="max-width: 375px; height: auto; margin-bottom: 10px;">`;
      }
      if (productDescriptionKey) {
        content += `<p id="product-description" class="product-description" style="font-size: 14px; margin-bottom: 10px;">${item[productDescriptionKey]}</p>`;
      }
      if (productRatingKey) {
        content += `<p style="font-size: 14px; margin-bottom: 10px;">Rating : ${item[productRatingKey]}</p>`;
      }
      content += `<button class="add-to-cart-button" data-product-id="${item.id}" style="background-color: #007bff; color: #fff; border: none; padding: 5px 10px; cursor: pointer; font-size: 14px;">Add to Cart</button>`;
      content += "</div>";
    });
    content += "</div>";

    const els = document.querySelectorAll(".product-component");
    Array.prototype.forEach.call(els, (_, idx) => {
      document.getElementsByClassName("product-component")[idx].innerHTML =
        content;
    });

    const addToCartButtons = Array.from(
      document.querySelectorAll(".add-to-cart-button")
    );

    addToCartButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const productId = button.getAttribute("data-product-id");
        addToCart(productId);
      });
    });
  }

  const script = function (props) {
    // const component = document.querySelectorAll(".product-component")
    // component.setAttributes({
    //     'productNameKey': props.productNameKey || "",
    //     'productImgKey': props.productImgKey || "",
    //     'productDescriptionKey': props.productDescriptionKey || "",
    //     'productRatingKey': props.productRatingKey || "",
    //   });

    const fetchProductData = (
      url,
      productNameKey,
      productImgKey,
      productDescriptionKey,
      productRatingKey
    ) => {
      if (url) {
        return fetch(url)
          .then((response) => response.json())
          .then((data) => {
            generateProductContent(
              data,
              productNameKey,
              productImgKey,
              productDescriptionKey,
              productRatingKey
            );
          })
          .catch((error) => {
            console.error("Error fetching product data:", error);
          });
      }
    };

    function addToCart(productId) {
      const apiEndpoint = props.apiEndpoint;
      const postData = {
        product_id: productId,
      };

      fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      })
        .then((response) => {
          if (response.ok) {
            console.log("Product added to cart successfully");
          } else {
            console.error("Failed to add product to cart");
          }
        })
        .catch((error) => {
          console.error("Error adding product to cart:", error);
        });
    }

    function generateProductContent(
      data,
      productNameKey,
      productImgKey,
      productDescriptionKey,
      productRatingKey
    ) {
      // Check if data is an array
      if (!Array.isArray(data)) {
        console.error("Data is not in the expected format (not an array)");
        return;
      }

      let content = "<div>";
      data?.forEach((item) => {
        if (typeof item !== "object") {
          console.error("Item is not in the expected format (not an object)");
          return;
        }
        content += `<div class="product-item-card" data-product-id="${item.id}" style="border: 1px solid #ccc; border-radius: 5px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); padding: 10px; margin-bottom: 20px; background-color: #fff;">`;
        content += `<h3 id="product-name" class="product-name" style="font-size: 18px; margin-bottom: 10px;">${item[productNameKey]}</h3>`;
        if (productImgKey) {
          content += `<img id="product-image" class="product-image" src="${item[productImgKey]}" alt="${item[productNameKey]}" style="max-width: 375px; height: auto; margin-bottom: 10px;">`;
        }
        if (productDescriptionKey) {
          content += `<p id="product-description" class="product-description" style="font-size: 14px; margin-bottom: 10px;">${item[productDescriptionKey]}</p>`;
        }
        if (productRatingKey) {
          content += `<p style="font-size: 14px; margin-bottom: 10px;">Rating : ${item[productRatingKey]}</p>`;
        }
        content += `<button class="add-to-cart-button" data-product-id="${item.id}" style="background-color: #007bff; color: #fff; border: none; padding: 5px 10px; cursor: pointer; font-size: 14px;">Add to Cart</button>`;
        content += "</div>";
      });
      content += "</div>";

      const els = document.querySelectorAll(".product-component");
      Array.prototype.forEach.call(els, (_, idx) => {
        document.getElementsByClassName("product-component")[idx].innerHTML =
          content;
      });

      const addToCartButtons = Array.from(
        document.querySelectorAll(".add-to-cart-button")
      );

      addToCartButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const productId = button.getAttribute("data-product-id");
          addToCart(productId);
        });
      });
    }

    fetchProductData(
      props.apiUrl,
      props.productNameKey,
      props.productImgKey,
      props.productDescriptionKey,
      props.productRatingKey
    );

    window.addEventListener("load", () => {
      fetchProductData(
        props.apiUrl,
        props.productNameKey,
        props.productImgKey,
        props.productDescriptionKey,
        props.productRatingKey
      );
    });
  };

  editor.DomComponents.addType("product-component", {
    model: {
      defaults: {
        script,
        content: `<div id="product-component" class="product-component" data-gjs-type="product-component" ></div>`,
        apiUrl: "http://localhost:3001/products",
        apiEndpoint: "http://localhost:3001/products",
        productNameKey: "",
        productImgKey: "",
        productDescriptionKey: "",
        productRatingKey: "",
        traits: [
          {
            name: "apiUrl",
            label: "API URL",
            type: "select",
            options: apiUrlOptions,
            changeProp: true,
          },
          {
            name: "apiEndpoint",
            label: "Button API Endpoint",
            type: "text",
            changeProp: true,
          },
          {
            name: "productNameKey",
            label: "product Name Key",
            type: "text",
            changeProp: true,
          },
          {
            name: "productImgKey",
            label: "product Image Key",
            type: "text",
            changeProp: true,
          },
          {
            name: "productDescriptionKey",
            label: "product Description Key",
            type: "text",
            changeProp: true,
          },
          {
            name: "productRatingKey",
            label: "product Rating Key",
            type: "text",
            changeProp: true,
          },
        ],
        "script-props": [
          "fetchProductData",
          "apiUrl",
          "apiEndpoint",
          "productNameKey",
          "productImgKey",
          "productDescriptionKey",
          "productRatingKey",
        ],
      },
      view: {
        async onRender() {
          const url = this.model.get("apiUrl");

          const content = await fetchProductData(
            url,
            this.model.get("productNameKey"),
            this.model.get("productImgKey"),
            this.model.get("productDescriptionKey"),
            this.model.get("productRatingKey")
          );

          this.model.components(content);
        },
      },

      // init(){
      //   this.on("change:productNameKey", this.handleAltChange);
      // },

      //   handleAltChange() {
      //   const component =editor.getSelected();
      //   component.setAttributes({
      //       'productNameKey': component.props.productNameKey || "",
      //       'productImgKey': component.props.productImgKey || "",
      //       'productDescriptionKey': component.props.productDescriptionKey || "",
      //       'productRatingKey': component.props.productRatingKey || "",
      //     });

      //   console.log("component",component)
      // },
    },
  });

  editor.BlockManager.add("product-block", {
    label: "Product Block",
    category: "Dynamic Blocks",
    attributes: { class: "fa fa-shopping-cart" },
    content: { type: "product-component" },
    // content: `<div  class="product-component" data-gjs-type="product-component" ></div>`,
  });
};
