import { message } from "antd";

export const publish = async (editor) => {
  editor.store();

  const templateId = localStorage.getItem("templateId");
  const publishUrl = `http://localhost:3001/publish/${templateId}`;

  try {
    const response = await fetch(publishUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const linkUrl = publishUrl;
      message.success("Template published successfully");

      // Copy the link URL to the clipboard
      await navigator.clipboard.writeText(linkUrl);
      message.success("Link copied to clipboard");

      return linkUrl;
    } else {
      throw new Error("Failed to publish template");
    }
  } catch (error) {
    console.error("Error publishing:", error);
    throw error;
  }
};
