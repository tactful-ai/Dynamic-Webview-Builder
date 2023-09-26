# Creating a Component that Fetches Content from an API - FAQ Component

In web development, it's common to create components that fetch data from APIs to display dynamic content. In this example, we'll explore how to create a React component for displaying Frequently Asked Questions (FAQs) fetched from an API.

## The FAQ Component

The `faqContent` component is designed to fetch and display FAQ data from an API. Let's break down how this component works step by step.

### Fetching Data from the API

```javascript
const fetchFAQData = (url, questionKey, answerKey) => {
  if (url) {
    return fetch(url)
      .then((response) => response.json())
      .then((data) => {
        generateFAQContent(data, questionKey, answerKey);
      })
      .catch((error) => {
        console.error("Error fetching FAQ data:", error);
      });
  }
};
```

- The `fetchFAQData` function takes three parameters: `url` (API endpoint URL), `questionKey` (key for FAQ questions), and `answerKey` (key for FAQ answers).
- It uses the `fetch` API to make an HTTP GET request to the specified `url` and handles the response asynchronously.
- Once the data is fetched, it calls the `generateFAQContent` function to generate the HTML content for rendering.

### Generating HTML Content

```javascript
function generateFAQContent(data, questionKey, answerKey) {
  if (!Array.isArray(data)) {
    console.error("Data is not in the expected format (not an array)");
    return;
  }

  let content = "<div>";
  data.forEach((item) => {
    content += `<div class="faq-item">
      <h3 id="faq-ques" class="faq-ques">${item[questionKey]}</h3>
      <p id="faq-ans" class="faq-ans">${item[answerKey]}</p>
    </div>`;
  });
  content += "</div>";
  return content;
}
```

- The `generateFAQContent` function takes the fetched `data` and the keys for questions and answers.
- It checks if the `data` is an array and iterates over each item to generate HTML content for each FAQ item.
- The generated content includes question and answer elements within a container div.

### Script Function

```javascript
const script = function (props) {
  // ...
};

// ...
```

- The `script` function is a part of the component's script. It contains logic for fetching data and rendering it on the page.

### Component Definition

```javascript
editor.DomComponents.addType("faq-component", {
  model: {
    defaults: {
      script,
      content:
        "<div id='faq-component' class='faq-component' data-gjs-type='faq-component'>Fetching</div>",
      apiUrl: "http://localhost:3001/faq",
      questionKey: "",
      answerKey: "",
      traits: [
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
        },
      ],
      "script-props": ["fetchFAQData", "apiUrl", "questionKey", "answerKey"],
    },
  },
  view: {
    async onRender({ model }) {
      const url = model.get("apiUrl");
      const questionKey = model.get("questionKey");
      const answerKey = model.get("answerKey");

      const content = await fetchFAQData(url, questionKey, answerKey);

      this.model.components(content);
    },
  },
});
```

- The `faq-component` is registered as a GrapesJS component using `editor.DomComponents.addType`. It defines various properties, including the script, default content, API URL, question key, and answer key.

- The `view` section specifies the logic for rendering the component. It uses the `fetchFAQData` function to fetch FAQ data and populates the component with the generated HTML content.

### Adding the Component to the Block Manager

```javascript
editor.BlockManager.add("faq-block", {
  label: "FAQ Block",
  category: "Dynamic Blocks",
  attributes: { class: "fa fa-comments-o" },
  content: {
    type: "faq-component",
  },
});
```

- Finally, the FAQ component is added to the GrapesJS Block Manager as a "FAQ Block." Users can easily insert this block into their templates using the GrapesJS interface.

## Conclusion

Creating components that fetch content from APIs is a fundamental part of building dynamic web applications. The `faqContent` component serves as an example of how to fetch and display FAQ data in a visually appealing manner, allowing users to incorporate dynamic content into their templates seamlessly.
