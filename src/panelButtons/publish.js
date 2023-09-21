import { message } from "antd";

export const publish = async (editor, templateId) => {
  // Accept templateId as a parameter
  editor.store();

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

      return linkUrl;
    } else {
      throw new Error("Failed to publish template");
    }
  } catch (error) {
    console.error("Error publishing:", error);
    throw error;
  }
};
