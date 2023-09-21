import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { message, Card, Button, Modal, Input, Spin } from "antd";

export function Home() {
  const cardContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const cardStyle = {
    width: "400px",
    margin: "16px",
    textAlign: "center",
    backgroundColor: "#f5f5f5", // Light grey background color
  };

  const modalStyle = {
    marginLeft: "800px",
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [templateName, setTemplateName] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State for loading screen
  const navigate = useNavigate();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      setIsLoading(true); // Show loading screen

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

        setIsModalVisible(false);
        setTemplateName("");
        setIsLoading(false); // Hide loading screen
      }, 1000); // Simulated 2-second delay (adjust as needed)
    } catch (error) {
      console.error("Error creating template:", error);
      message.error("Error creating template.");
      setIsModalVisible(false);
      setTemplateName("");
      setIsLoading(false); // Hide loading screen on error
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setTemplateName("");
  };

  return (
    <div style={cardContainerStyle}>
      <div style={{ display: "flex" }}>
        <Card title="New Template" style={cardStyle}>
          <p>Create a new template from scratch.</p>
          <Button type="primary" onClick={showModal}>
            Create
          </Button>
        </Card>
      </div>

      <Modal
        title="Enter Template Name"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        style={modalStyle}
        width={"500px"}
        bodyStyle={{ height: 50 }}
      >
        <Input
          placeholder="Template Name"
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
        />
      </Modal>

      {/* Loading screen */}
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
