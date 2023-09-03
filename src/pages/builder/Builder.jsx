import GjsEditor from "@grapesjs/react";
import gjsOptions from "/src/utils/gjsOptions";

import { editorPlugins } from "/src/utils/plugins";
import { defineCustomBlocks } from "/src/utils/customBlocks";

import { message } from 'antd';

export function Builder() {
  const onEditor = (editor) => {
    const editorPanels = editor.Panels;
    const editorCommands = editor.Commands;
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

    editorCommands.add("save-db", function (editor, sender) {
      sender && sender.set("active", 0);
      editor.store();
    
      const htmlContent = editor.getHtml();
      
      const externalCssUrls = editor.getConfig().canvas.styles;
      const fetchCssPromises = externalCssUrls.map(url => fetch(url).then(response => response.text()));
    
      Promise.all(fetchCssPromises)
        .then(externalCssArray => {
          const internalCss = editor.getCss();
          const combinedCss = externalCssArray.join('\n') + '\n' + internalCss;
    
          var styles = `<style>${combinedCss}</style>`;
          console.log(htmlContent);
          console.log('css', combinedCss);
    
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
            })
            .catch((error) => {
              console.error("Error saving data:", error);
              message.error('Error saving draft');
            });
        })
        .catch((error) => {
          console.error("Error fetching external CSS:", error);
          message.error('Error fetching external CSS');
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

    
    editor.DomComponents.addType('dynamic-api-content', {
      model: {
        defaults: {
          apiUrl: '',
          content: '',
          traits: [
            {
              type: 'text',
              name: 'apiUrl',
              label: 'API URL',
            },
            {
              type: 'button',
              text: 'Fetch Content',
              full: true,
              functionName: 'onFetchClick',
            },
          ],
        },
        methods: {
          onFetchClick() {
            const apiUrl = this.get('apiUrl');
            if (apiUrl) {
              console.log('Fetching content from:', apiUrl);
              this.fetchContent(apiUrl);
            }
          },
          fetchContent(apiUrl) {
            fetch(apiUrl)
              .then(response => response.text())
              .then(data => {
                this.set('content', data);
              })
              .catch(error => {
                console.error('Error fetching content:', error);
              });
          },
        },
      },
      view: {
        onRender() {
          const content = this.model.get('content');
          if (content) {
            this.el.innerHTML = content;
          }
        },
      },
    });
    editor.onReady(() => {
      editor.getComponents().add(
        '<link rel="stylesheet" href="public/stylesheets/canvas.css">'
      )
   });
    
    editor.BlockManager.add('dynamic-api-block', {
      label: 'Dynamic API Block',
      category: 'Custom Blocks',
      content: {
        type: 'dynamic-api-content',
        components: '<p>Loading...</p>',
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
