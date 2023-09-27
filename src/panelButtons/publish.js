import { message } from "antd";

export const publish = async (editor, templateId) => {
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
      window.open(publishUrl,'_blank');
      return publishUrl;
    } else {
      message.error("Failed to publish template");
      throw new Error("Failed to publish template");
    }
  } catch (error) {
    console.error("Error publishing:", error);
    throw error;
  }
};
