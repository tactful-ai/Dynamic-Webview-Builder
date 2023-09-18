import { useState } from "react";
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
import { saveDraft } from "/src/panelButtons/saveDraft";
import { publish } from "/src/panelButtons/publish";
import { message } from "antd";

export function Builder() {
  const [generatedLink, setGeneratedLink] = useState("");
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

    defineFormBlocks(editor);
    faqContent(editor);
    customButton(editor);
    customInput(editor)
    itemDetailsBlock(editor);
    customText(editor);
    defineCustomBlocks(editor);
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
