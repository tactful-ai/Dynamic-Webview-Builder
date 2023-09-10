export const itemDetailsBlock = (editor) => {
  const fetchProductData = (url, productNameKey,productImgKey,productDescriptionKey,productRatingKey) => {
    let content;
    if (url) {
      return fetch(url)
        .then((response) => response.json())
        .then((data) => {
          // Process product data and set the component's content
          content = generateProductContent(data, productNameKey,productImgKey,productDescriptionKey,productRatingKey);
          return content;
        })
        .catch((error) => {
          console.error('Error fetching product data:', error);
        });
    }
  };


  const script = function (props) {
    console.log({ props });
    // Function to fetch product data
    const fetchProductData = (url, productNameKey,productImgKey,productDescriptionKey,productRatingKey) => {
      if (url) {
        return fetch(url)
          .then((response) => response.json())
          .then((data) => {
            // Process product data and set the component's content
            generateProductContent(data, productNameKey,productImgKey,productDescriptionKey,productRatingKey);
          })
          .catch((error) => {
            console.error('Error fetching product data:', error);
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
    function generateProductContent(data, productNameKey,productImgKey,productDescriptionKey,productRatingKey) {
      // Generate HTML content for displaying products
      let content = '<div class="product-component">';
      data?.forEach((item) => {
        content += '<div class="product-item-card" style="border: 1px solid #ccc; border-radius: 5px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); padding: 10px; margin-bottom: 20px; background-color: #fff;">';
        content += `<h3 id="product-name" class="product-name" style="font-size: 18px; margin-bottom: 10px;">${item[productNameKey]}</h3>`;
        if (productImgKey) {
          content += `<img id="product-image" class="product-image" src="${item[productImgKey]}" alt="${item[productNameKey]}" style="max-width: 375px; height: auto; margin-bottom: 10px;">`;
        }
        if (productDescriptionKey) {content += `<p id="product-description" class="product-description" style="font-size: 14px; margin-bottom: 10px;">${item[productDescriptionKey]}</p>`;}
        if (productRatingKey) {content += `<p style="font-size: 14px; margin-bottom: 10px;">Rating : ${item[productRatingKey]}</p>`;}
        content += `<button class="add-to-cart-button" data-product-id="${item.id}" style="background-color: #007bff; color: #fff; border: none; padding: 5px 10px; cursor: pointer; font-size: 14px;">Add to Cart</button>`;
        content += '</div>';
      });
      content += '</div>';
      const els = document.querySelectorAll('.product-component');
      console.log('els', els);
      Array.prototype.forEach.call(els, (_, idx) => {
        console.log(
          'elements',
          document.getElementsByClassName('fproduct-component')[idx]
        );
        document.getElementsByClassName('product-component')[idx].innerHTML =
          content;
      });
      console.log(data);
      console.log(content);

      // Add click event listeners to the "Add to Cart" buttons
      const addToCartButtons = Array.from(
        document.querySelectorAll('.add-to-cart-button')
      );
      addToCartButtons.forEach((button) => {
        button.addEventListener('click', () => {
          const productId = button.getAttribute('data-product-id');
          addToCart(productId);
        });
      });
    }

    fetchProductData(props.apiUrl, props.productNameKey,props.productImgKey,props.productDescriptionKey,props.productRatingKey);

    window.addEventListener('load', () => {
      fetchProductData(props.apiUrl, props.productNameKey,props.productImgKey,props.productDescriptionKey,props.productRatingKey);
    });
  };

  function generateProductContent(data, productNameKey,productImgKey,productDescriptionKey,productRatingKey) {
    let content = '<div class="product-component">';
    data?.forEach((item) => {
      content += '<div class="product-item-card" style="border: 1px solid #ccc; border-radius: 5px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); padding: 10px; margin-bottom: 20px; background-color: #fff;">';
      content += `<h3 id="product-name" class="product-name" style="font-size: 18px; margin-bottom: 10px;">${item[productNameKey]}</h3>`;
      if (productImgKey) {
        content += `<img id="product-image" class="product-image" src="${item[productImgKey]}" alt="${item[productNameKey]}" style="max-width: 375px; height: auto; margin-bottom: 10px;">`;
      }
      if (productDescriptionKey) {content += `<p id="product-description" class="product-description" style="font-size: 14px; margin-bottom: 10px;">${item[productDescriptionKey]}</p>`;}
      if (productRatingKey) {content += `<p style="font-size: 14px; margin-bottom: 10px;">Rating : ${item[productRatingKey]}</p>`;}
      content += `<button class="add-to-cart-button" data-product-id="${item.id}" style="background-color: #007bff; color: #fff; border: none; padding: 5px 10px; cursor: pointer; font-size: 14px;">Add to Cart</button>`;
      content += '</div>';
    });
    content += '</div>';
    return content;
  }


  

  editor.DomComponents.addType("product-component", {
    model: {
      defaults: {
        script,
        apiUrl: "http://localhost:3001/products",
        content: '',
        apiEndpoint: 'http://localhost:3001/products',
        productNameKey: 'productName',
        productImgKey:'',
        productDescriptionKey:'',
        productRatingKey:'',
        traits: [
          {
            name: 'apiEndpoint',
            label: 'Button API Endpoint',
            type: 'text',
            changeProp: true,
          },
          {
            name: 'productNameKey',
            label: 'product Name Key',
            type: 'text',
            changeProp: true,
          },
          {
            name: 'productImgKey',
            label: 'product Image Key',
            type: 'text',
            changeProp: true,
          },
          {
            name: 'productDescriptionKey',
            label: 'product Description Key',
            type: 'text',
            changeProp: true,
          },
          {
            name: 'productRatingKey',
            label: 'product Rating Key',
            type: 'text',
            changeProp: true,
          },
        ],
        'script-props': [
          'fetchProductData',
          'apiUrl',
          'apiEndpoint',
          'productNameKey',
          'productImgKey',
          'productDescriptionKey',
          'productRatingKey',
        ],
      },
      async updated(property, value, prevValue) {
        console.log(property, value, prevValue);

        if (property === 'traits') {
          const traits = this.getTraits();
          console.log({ traits });
        }
      },
    },
    view: {
    },
  });

  editor.BlockManager.add("product-block", {
    label: "Product Block",
    category: "Dynamic Blocks",
    content: `<div id="product-component" class="product-component" data-gjs-type="product-component" ></div>`,
  });
};
