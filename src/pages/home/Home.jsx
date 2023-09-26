import { useState, useEffect } from "react";
import { Row, Col, Button, Modal, Input, message, Spin } from "antd";
import {useNavigate } from "react-router-dom";
import TemplateCard from "/src/templates/templateCard";

export const Home = () => {
  const [templates, setTemplates] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [templateName, setTemplateName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/templates")
      .then((response) => response.json())
      .then((data) => setTemplates(data))
      .catch((error) => console.error("Error fetching templates:", error));
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    if (templateName.trim() === "") {
      message.error("Please enter a template name.");
      return;
    }

    try {
      setIsLoading(true);

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
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error creating template:", error);
      message.error("Error creating template.");
      setIsModalVisible(false);
      setTemplateName("");
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setTemplateName("");
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1>Your Templates</h1>
        <Button type="primary" onClick={showModal}>
          New Template
        </Button>
      </div>
      <Row gutter={16}>
        {templates.map((template) => (
          <Col span={8} key={template._id}>
            <TemplateCard templateId={template._id} />
          </Col>
        ))}
      </Row>

      <Modal
        title="Enter Template Name"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          placeholder="Enter template name"
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
        />
      </Modal>

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
};
