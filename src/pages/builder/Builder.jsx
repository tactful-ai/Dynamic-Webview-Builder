import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";

import GjsEditor from "@grapesjs/react";
import gjsOptions from "/src/utils/gjsOptions";
import { editorPlugins } from "/src/utils/plugins";
import { defineCustomBlocks } from "/src/customBlocks/customBlocks";
import { itemDetailsBlock } from "/src/customBlocks/itemDetails";
import { faqContent } from "/src/customBlocks/faqContent";
import { customText } from "/src/customBlocks/customText";
import { customButton } from "/src/customBlocks/customButton";
import { customInput } from "/src/customBlocks/customInput";
import { defineFormBlocks } from "/src/customBlocks/formBlocks";
import {defineTicket} from "/src/customBlocks/ticketBlock";
import { saveDraft } from "/src/panelButtons/saveDraft";
import { publish } from "/src/panelButtons/publish";
import { message } from "antd";

export function Builder() {
  const { id } = useParams();

  const [generatedLink, setGeneratedLink] = useState("");
  const [templateData, setTemplateData] = useState(null);

  useEffect(() => {
    // Fetch the template data based on the :id parameter from the backend
    const fetchTemplateData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/templates/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch template data.");
        }
        const data = await response.json();
        setTemplateData(data); // Update the state with the fetched template data
      } catch (error) {
        console.error("Error fetching template data:", error);
      }
    };

    fetchTemplateData(); // Call the fetchTemplateData function when the component mounts
  }, [id]);

  const onEditor = (editor) => {

  editor.on('load', () => {
    editor.setComponents(templateData.content);
    editor.setStyle(templateData.style);
 });


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

    //Save Draft Button
    editorCommands.add("save-db", function (editor, sender) {
      sender && sender.set("active", 0);
      saveDraft(editor);
    });

    editorPanels.addButton("options", [
      {
        id: "save-db",
        className: "fa fa-floppy-o",
        command: "save-db",
        attributes: { title: "Save Draft" },
      },
    ]);

    // Publish Button
    editorCommands.add("publish", function (editor, sender) {
      sender && sender.set("active", 0);
      publish(editor)
        .then((link) => {
          setGeneratedLink(link);
        })
        .catch((error) => {
          console.error("Error publishing:", error);
          message.error("Error publishing template");
        });
    });

    editorPanels.addButton("options", [
      {
        id: "publish",
        className: "fa fa-paper-plane",
        command: "publish",
        attributes: { title: "Publish" },
      },
    ]);
    // editor.setComponents(templateData);
    // // editor.setStyle(templateData.css);

    defineFormBlocks(editor);
    faqContent(editor);
    customButton(editor);
    customInput(editor)
    itemDetailsBlock(editor);
    customText(editor);
    defineCustomBlocks(editor);
    defineTicket(editor);
    window.editor = editor;

  };

  return (
    <>
      <div>
        <div>
          <input
            type="text"
            value={generatedLink}
            readOnly
            placeholder="Generated Link"
            style={{
              fontSize: "18px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              width: "30%",
              marginTop: "-30px",
              marginBottom: "5px",
            }}
          />
        </div>
        {templateData && ( // Render the GjsEditor only when templateData is available
          <GjsEditor
            grapesjs="https://unpkg.com/grapesjs"
            grapesjsCss="https://unpkg.com/grapesjs/dist/css/grapes.min.css"
            options={gjsOptions}
            plugins={editorPlugins}
            onEditor={onEditor}
            // initialContent={templateData.content} // Pass the template content as initial content
            // initialStyle={templateData.style}     // Pass the template style as initial style
          />
        )}
      </div>
    </>
  );
}
