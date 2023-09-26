import { useState } from "react";
import { Button, Input, Spin, message } from "antd";
import { useNavigate } from "react-router-dom";

export function BuilderForm() {
  const [templateName, setTemplateName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSave = async () => {
    if (templateName.trim() === "") {
      message.error("Please enter a template name.");
      return;
    }

    try {
      setIsLoading(true);

      // Simulate an asynchronous operation with a timeout (remove this in your actual code)
      setTimeout(async () => {
        const response = await fetch("http://localhost:3001/save-draft", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: {},
            style: {},
            name: templateName,
          }),
        });

        if (response.status === 201) {
          const data = await response.json();
          message.success("Template created successfully!");
          navigate(`/builder/${data.templateId}`);
        } else {
          message.error("Failed to create template.");
        }

        setTemplateName("");
        setIsLoading(false);
      }, 1000); // Simulated 2-second delay (adjust as needed)
    } catch (error) {
      console.error("Error creating template:", error);
      message.error("Error creating template.");
      setTemplateName("");
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "20px" }}>Create New Template</h2>
      <div style={{ marginBottom: "10px" }}>
        <label htmlFor="templateName">Template Name:</label>
        <Input
          id="templateName"
          placeholder="Enter template name"
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
          style={{ marginLeft: "10px", width: "500px" }}
        />
      </div>
      <div style={{ marginTop: "20px" }}>
        <Button
          style={{ marginLeft: "550px" }}
          type="primary"
          onClick={handleSave}
        >
          Create
        </Button>
      </div>

      {isLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "rgba(0, 0, 0, 0.2)",
            zIndex: 9999,
          }}
        >
          <Spin size="large" />
        </div>
      )}
    </div>
  );
}
