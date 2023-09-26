import { Card, Button, Modal, message } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

const TemplateCard = ({ templateId }) => {
  const [templateName, setTemplateName] = useState(
    localStorage.getItem(`templateName_${templateId}`) || ""
  );

  useEffect(() => {
    fetchTemplateName();
  }, [templateId]);

  const fetchTemplateName = () => {
    const storedName = localStorage.getItem(`templateName_${templateId}`);
    if (storedName) {
      setTemplateName(storedName);
    } else {
      fetch(`http://localhost:3001/templates/${templateId}`)
        .then((response) => response.json())
        .then((data) => {
          const name = data.name;
          setTemplateName(name);
          localStorage.setItem(`templateName_${templateId}`, name);
        })
        .catch((error) => {
          console.error("Error fetching template name:", error); // Log errors
        });
    }
  };

  const handleViewClick = () => {
    const viewURL = `http://localhost:3001/publish/${templateId}`;
    window.open(viewURL, "_blank");
  };

  const handleEditClick = () => {
    const editURL = `http://localhost:5173/Builder/${templateId}`;
    window.location.href = editURL;
  };

  const showDeleteModal = () => {
    Modal.confirm({
      title: "Confirm Delete",
      content: "Are you sure you want to delete this template?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        fetch(`http://localhost:3001/delete/${templateId}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (response.ok) {
              window.location.reload();
              message.success("Template deleted successfully");
              // Remove the template name from localStorage upon deletion
              localStorage.removeItem(`templateName_${templateId}`);
            } else {
              message.error("Error deleting template");
              console.error("Error deleting template:", response.statusText);
            }
          })
          .catch((error) => {
            console.error("Error deleting template:", error);
          });
      },
    });
  };

  return (
    <Card
      title={`${templateName}`}
      style={{ marginTop: "10%" }}
      actions={[
        <Button
          type="default"
          icon={<EyeOutlined />}
          key="view"
          onClick={handleViewClick}
        >
          View
        </Button>,
        <Button
          type="primary"
          icon={<EditOutlined />}
          key="edit"
          onClick={handleEditClick}
        >
          Edit
        </Button>,
        <Button
          type="danger"
          icon={<DeleteOutlined />}
          key="delete"
          onClick={showDeleteModal}
          style={{ background: "red", color: "white" }}
        >
          Delete
        </Button>,
      ]}
    >
      <iframe
        src={`http://localhost:3001/publish/${templateId}`}
        title={`Template - ${templateId}`}
        style={{
          width: "100%",
          height: "400px",
          border: "none",
          borderRadius: "4px",
        }}
        sandbox="allow-scripts allow-same-origin"
      ></iframe>
    </Card>
  );
};

export default TemplateCard;
