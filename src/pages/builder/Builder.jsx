import GjsEditor from "@grapesjs/react";
import gjsOptions from "/src/utils/gjsOptions";

import { editorPlugins } from "/src/utils/plugins";
import { defineCustomBlocks } from "/src/utils/customBlocks";

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
    const fetchFAQData = (component) => {
      const apiUrl = component.get("apiUrl");
      if (apiUrl) {
        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => {
            // Process FAQ data and set the component's content
            const content = generateFAQContent(data);
            component.set("content", content);
          })
          .catch((error) => {
            console.error("Error fetching FAQ data:", error);
          });
      }
    };
    const script = function (props) {
      window.addEventListener("load", (event) => {
        prop1: props.fetchFAQData;
      });
      alert("Hello");
    };

    // Function to generate FAQ content
    function generateFAQContent(data) {
      // Generate HTML content for displaying FAQ items
      let content = '<div class="faq-component">';
      data.forEach((item) => {
        content += `<div class="faq-item">
          <h3>${item.question}</h3>
          <p>${item.answer}</p>
      </div>`;
      });
      content += "</div>";
      return content;
    }

    editor.DomComponents.addType("faq-component", {
      model: {
        defaults: {
          script,
          myprop1: fetchFAQData,
          apiUrl: "http://localhost:3001/faq",
          content: "",
          "script-props": ["fetchFAQData"],
        },
        init() {
          // Fetch FAQ data when the component is initialized
          fetchFAQData(this);
        },
      },
      view: {
        onRender() {
          const content = this.model.get("content");
          if (content) {
            this.el.innerHTML = content;
          }
        },
      },
    });

    editor.BlockManager.add("faq-block", {
      label: "FAQ Block",
      category: "Dynamic Blocks",
      content: {
        type: "faq-component",
      },
    });

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
