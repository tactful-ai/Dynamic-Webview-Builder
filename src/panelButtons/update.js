import { message } from "antd";

export const update = (editor, templateId) => {
  editor.store();

  const htmlContent = editor.getHtml();
  const externalCssUrls = editor.getConfig().canvas.styles;

  const fetchCssPromises = externalCssUrls.map((url) =>
    fetch(url).then((response) => response.text())
  );

  Promise.all(fetchCssPromises)
    .then((externalCssArray) => {
      // Combine external and internal CSS into a single <style> block
      const internalCss = editor.getCss();
      const combinedCss = externalCssArray.join("\n") + "\n" + internalCss;
      const updatedStyles = `<style>${combinedCss}</style>`;

      fetch(`http://localhost:3001/update/${templateId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: htmlContent, style: updatedStyles }),
      })
        .then((response) => response.json())
        .then((data) => {
          message.success("Template updated successfully");
        })
        .catch((error) => {
          console.error("Error updating template:", error);
          message.error("Error updating template");
        });
    })
    .catch((error) => {
      console.error("Error fetching external CSS:", error);
      message.error("Error fetching external CSS");
    });
};
