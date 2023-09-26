import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GjsEditor from "@grapesjs/react";
import gjsOptions from "/src/utils/gjsOptions";
import { editorPlugins } from "/src/utils/plugins";
import { defineCustomBlocks } from "/src/customBlocks/customBlocks";
import { itemDetailsBlock } from "/src/customBlocks/itemDetails";
import { faqContent } from "/src/customBlocks/faqContent";
import { customButton } from "/src/customBlocks/customButton";
import { customInput } from "/src/customBlocks/customInput";
import { defineFormBlocks } from "/src/customBlocks/formBlocks";
import {defineTicket} from "/src/customBlocks/ticketBlock";
// import { saveDraft } from "/src/panelButtons/saveDraft";
import { update } from "/src/panelButtons/update";
import { publish } from "/src/panelButtons/publish";
import { message } from "antd";
import { CopyField } from "@eisberg-labs/mui-copy-field";

export function Builder() {
  const { templateId } = useParams();

  const [generatedLink, setGeneratedLink] = useState("");
  // const [templateData, setTemplateData] = useState({ content: "", style: "" }); // Initialize with an empty object

  const copyToClipboard = () => {
    const linkInput = document.createElement("input");
    linkInput.value = generatedLink;

    document.body.appendChild(linkInput);
    linkInput.select();
    document.execCommand("copy");
    document.body.removeChild(linkInput);

    message.success("Link copied to clipboard");
  };

  useEffect(() => {
    const fetchTemplateData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/templates/${templateId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch template data.");
        }
        const data = await response.json();

        // Store the template data in localStorage
        localStorage.setItem("templateData", JSON.stringify(data));
      } catch (error) {
        console.error("Error fetching template data:", error);
      }
    };

    fetchTemplateData();
  }, [templateId]);

  const onEditor = (editor) => {
    editor.on("load", () => {
      const storedTemplateData = localStorage.getItem("templateData");

//   editor.on('load', () => {
//     editor.setComponents(templateData.content);
//     editor.setStyle(templateData.style);
//  });
      if (storedTemplateData) {
        const templateData = JSON.parse(storedTemplateData);

        if (templateData.content) {
          editor.setComponents(templateData.content);
        }
        if (templateData.style) {
          editor.setStyle(templateData.style);
        }
      }
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

    // Update Button
    editorCommands.add("update", function (editor, sender) {
      sender && sender.set("active", 0);
      update(editor, templateId);
    });

    editorPanels.addButton("options", [
      {
        id: "update",
        className: "fa fa-floppy-o",
        command: "update",
        attributes: { title: "Update" },
      },
    ]);

    // Publish Button
    editorCommands.add("publish", function (editor, sender) {
      sender && sender.set("active", 0);
      publish(editor, templateId)
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
    
    defineFormBlocks(editor);
    faqContent(editor);
    customButton(editor);
    customInput(editor);
    itemDetailsBlock(editor);
    defineCustomBlocks(editor);
    defineTicket(editor);
    window.editor = editor;
  };

  return (
    <>
      <div>
        <div>
          <CopyField
            type="text"
            value={generatedLink}
            readOnly
            label="Generated Link"
            onCopySuccess={copyToClipboard}
            style={{
              width: "500px",
              marginBottom: "5px",
            }}
          />
        </div>
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
