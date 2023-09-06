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
      const js = editor.getJs();
      console.log(js, 'js'); 
      
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

    const script = function (props) {
      const myLibOpts = {
        prop1: props.myprop1,
        prop2: props.myprop2,
      };
      alert('My lib options: ' + JSON.stringify(myLibOpts));
    };

    editor.Components.addType('dynamic-api-content', {
      model: {
        defaults: {
          script,
          // console: () => {console.log("hi")},
          apiUrl: '',
          myprop1: 'x',
          myprop2: 'y',
          content: {},
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
          'script-props': ['myprop1', 'myprop2', 'apiUrl'],
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
              .then((response) => response.text())
              .then((data) => {
                this.set('content', data);
              })
              .catch((error) => {
                console.error('Error fetching content:', error);
              });
          },
        },
      },
      view: {
        onRender({ el, model }) {
          console.log(el);
          fetch('https://jsonplaceholder.typicode.com/posts/1')
            .then((response) => response.json())
            .then((data) => {
              model.set('content', data.title);
              console.log('Error fetching content:', data);
            })
            .catch((error) => {
              console.error('Error fetching content:', error);
            });

          let content = model.get('content');

          console.log({ content });

          let comp1 =
            '<div>' +
            '<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png" />' +
            '<span title="foo">' +
            content +
            '</span>' +
            '</div>';

          const component = editor.addComponents(comp1);
          return component;
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
      content: `<div data-gjs-type="dynamic-api-content"></div>`,
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
