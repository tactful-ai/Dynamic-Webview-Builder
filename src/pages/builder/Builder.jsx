import GjsEditor from "@grapesjs/react";
import gjsOptions from "/src/utils/gjsOptions";
import { editorPlugins } from "/src/utils/plugins";
import { defineCustomBlocks } from "/src/costumBlocks/customBlocks";
import { itemDetailsBlock } from "/src/costumBlocks/itemDetails";
import { message } from "antd";

export function Builder() {
  const onEditor = (editor) => {
    const editorPanels = editor.Panels;
    const editorCommands = editor.Commands;
    const panelViews = editorPanels.addPanel({
      id: "views",
    });

    panelViews.get("buttons").add([
      {
        attributes: {
          title: "Open Code",
        },
        className: "fa fa-file-code-o",
        command: "open-code",
        togglable: false,
        id: "open-code",
      },
    ]);

    editorPanels.addButton("options", [
      {
        id: "save-db",
        className: "fa fa-floppy-o",
        command: "save-db",
        attributes: { title: "Save DB" },
      },
    ]);

    editorPanels.addButton("options", [
      {
        id: "publish",
        className: "fa fa-paper-plane",
        command: "publish",
        attributes: { title: "publish" },
      },
    ]);

    editorCommands.add("save-db", function (editor, sender) {
      sender && sender.set("active", 0);
      editor.store();

      const htmlContent = editor.getHtml();

      const externalCssUrls = editor.getConfig().canvas.styles;
      const fetchCssPromises = externalCssUrls.map((url) =>
        fetch(url).then((response) => response.text())
      );

      Promise.all(fetchCssPromises)
        .then((externalCssArray) => {
          const internalCss = editor.getCss();
          const combinedCss = externalCssArray.join("\n") + "\n" + internalCss;

          var styles = `<style>${combinedCss}</style>`;
          console.log(htmlContent);
          console.log("css", combinedCss);

          fetch("http://localhost:3001/save-draft", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ content: htmlContent, style: styles }),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("Data saved:", data);
              localStorage.setItem("templateId", data.templateId);
              console.log("template", data.templateId);
              message.success("Draft saved successfully");
            })
            .catch((error) => {
              console.error("Error saving data:", error);
              message.error("Error saving draft");
            });
        })
        .catch((error) => {
          console.error("Error fetching external CSS:", error);
          message.error("Error fetching external CSS");
        });
    });

    editorCommands.add("publish", function (editor, sender) {
      sender && sender.set("active", 0);
      editor.store();

      const templateId = localStorage.getItem("templateId");
      console.log("Stored Template ID:", templateId);

      fetch(`http://localhost:3001/publish/${templateId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(() => {
          // Generate the link URL
          const linkUrl = `http://localhost:3001/publish/${templateId}`;

          console.log("Link to published template:", linkUrl);

          message.success("Template published successfully");

          // Use the Clipboard API to copy the link URL to the clipboard
          navigator.clipboard
            .writeText(linkUrl)
            .then(() => {
              console.log("Link copied to clipboard:", linkUrl);
              message.success("Link copied to clipboard");
            })
            .catch((error) => {
              console.error("Error copying to clipboard:", error);
              message.error("Error copying link to clipboard");
            });
        })
        .catch((error) => {
          console.error("Error publishing:", error);
          message.error("Error publishing template");
        });
    });

    // Function to fetch FAQ data
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

    const script = function (props) {
      // Function to fetch FAQ data
      const fetchFAQData = (url) => {
        if (url) {
          return fetch(url)
            .then((response) => response.json())
            .then((data) => {
              // Process FAQ data and set the component's content
              generateFAQContent(data);
            })
            .catch((error) => {
              console.error("Error fetching FAQ data:", error);
            });
        }
      };
      // Function to generate FAQ content
      function generateFAQContent(data) {
        // Generate HTML content for displaying FAQ items
        let content = "";
        data?.forEach((item) => {
          content += `<div class="faq-item">  
        <h3 id="faq-ques" class="faq-ques" >${item.question}</h3>
        <p id="faq-ans" class="faq-ans" >${item.answer}</p>
      </div>`;
        });
        const els = document.querySelectorAll('.faq-component');
        console.log("els",els)
        Array.prototype.forEach.call(els, (_, idx) => {
          console.log("elements",document.getElementsByClassName('faq-component')[idx])
          document.getElementsByClassName('faq-component')[idx].innerHTML = content
        });
        console.log(data);
        console.log(content);
      }

      window.addEventListener("load", (event) => {
        fetchFAQData(props.apiUrl); // Call fetchFAQData with the current context
      });
      console.log(props);
    };

    // Function to generate FAQ content OUTSIDE
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

    editor.DomComponents.addType("faq-component", {
      model: {
        defaults: {
          script,
          // fetchFAQData: "fetchFAQData",
          // fetchFAQData: (url) => fetchFAQData(url),
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

    editor.BlockManager.add("faq-block", {
      label: "FAQ Block",
      category: "Dynamic Blocks",
      content: {
        type: "faq-component",
      },
      // content: `<div id="id" data-gjs-type="faq-component" ></div>`,
    });

    itemDetailsBlock(editor);
    defineCustomBlocks(editor);
    window.editor = editor;
  };

  return (
    <>
      <div>
        <GjsEditor
          grapesjs="https://unpkg.com/grapesjs"
          grapesjsCss="https://unpkg.com/grapesjs/dist/css/grapes.min.css"
          options={gjsOptions}
          plugins={editorPlugins}
          onEditor={onEditor}
        />
      </div>
    </>
  );
}
