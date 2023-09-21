import { useState, useEffect } from "react";
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
import { update } from "/src/panelButtons/update";
import { publish } from "/src/panelButtons/publish";
import { message } from "antd";
import { CopyField } from "@eisberg-labs/mui-copy-field";

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
  const { templateId } = useParams();

  const copyToClipboard = () => {
    // Create an input element to hold the link text
    const linkInput = document.createElement("input");
    linkInput.value = generatedLink;

    // Append the input element to the document
    document.body.appendChild(linkInput);

    // Select the input text
    linkInput.select();

    // Copy the selected text to the clipboard
    document.execCommand("copy");

    // Remove the input element from the document
    document.body.removeChild(linkInput);

    // Show a success message
    message.success("Link copied to clipboard");
  };

  const onEditor = (editor) => {
    editor.on("load", () => {
      console.log(templateData.content);
      //  const content =`
      // {${templateData.content}.match(/<script>(.*?)<\/script>/g)?.map((scriptTag, index) => (
      //   <pre key={index}>{scriptTag}</pre>
      // ))}`
      // console.log(content)

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

    //Update Button
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
      publish(editor, templateId) // Pass templateId as a parameter
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
    customInput(editor);
    itemDetailsBlock(editor);
    customText(editor);
    defineCustomBlocks(editor);
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
              width: "500px", // Set your desired width here
              marginBottom: "5px", // Set your desired margins here (e.g., 0 top/bottom, 10px left/right)
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
