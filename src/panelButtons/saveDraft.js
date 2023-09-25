import { message } from "antd";

export const saveDraft = (editor) => {
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
      var styles = `<style>${combinedCss}</style>`;

      fetch("http://localhost:3001/save-draft", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: htmlContent, style: styles }),
      })
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem("templateId", data.templateId);
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
};
