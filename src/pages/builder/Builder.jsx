import GjsEditor from "@grapesjs/react";
import gjsOptions from "/src/utils/gjsOptions";
import { editorPlugins } from "/src/utils/plugins";
import { message } from 'antd';
import { useState } from 'react';

export function Builder() {
  const [draftSaved, setDraftSaved] = useState(false);
  const onEditor = (editor) => {
    const editorPanels = editor.Panels;
    const editorCommands = editor.Commands;
    const editorBlockManager = editor.BlockManager;

    const panelViews = editorPanels.addPanel({
      id: 'views',
    });
    
    panelViews.get('buttons').add([
      {
        attributes: {
          title: 'Open Code',
        },
        className: 'fa fa-file-code-o',
        command: 'open-code',
        togglable: false, 
        id: 'open-code',
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

    editorCommands.add("save-db", 
      function (editor, sender) {
        sender && sender.set("active", 0);
        editor.store();

        const htmlContent = editor.getHtml();
        const cssStyles = editor.getCss();

        var styles = `<style>${cssStyles}</style>`;
        console.log(htmlContent);
        console.log('css',cssStyles);

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
            message.success('Draft saved successfully');
            setDraftSaved(true);
          })
          .catch((error) => {
            console.error("Error saving data:", error);
            message.error('Error saving draft');
          });
    });

    editorCommands.add("publish", 
      function (editor, sender) {
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
  
          message.success('Template published successfully');
            
          // Use the Clipboard API to copy the link URL to the clipboard
          navigator.clipboard.writeText(linkUrl)
          .then(() => {
            console.log("Link copied to clipboard:", linkUrl);
            message.success('Link copied to clipboard');
          })
          .catch((error) => {
            console.error("Error copying to clipboard:", error);
            message.error('Error copying link to clipboard');
          });

        })
        .catch((error) => {
          console.error("Error publishing:", error);
          message.error('Error publishing template');
        })
    });

    editorBlockManager.add('input-label-block', {
      label: 'Input Label',
      category: 'Styled Components',
      content: `
          <div class="input-label-block" >
            <div class="input-label-row">
              <label class="input-label" for="name">Name:</label>
              <input class="input-field" type="text" id="name">
            </div>
          </div>
        `,
    });

    editorBlockManager.add("styled-faq", {
      label: "Styled FAQ",
      category: "Styled Components",
      content: `
          <div class="styled-faq">
            <h2 class="faq-heading">Frequently Asked Questions</h2>
            <div class="faq-item">
              <h3>Question 1:</h3>
              <p>Answer to Question 1</p>
            </div>
          </div>
        `,
    });
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
