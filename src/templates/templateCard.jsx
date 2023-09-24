import { Card, Button } from "antd";
import { EyeOutlined, EditOutlined } from '@ant-design/icons';

const TemplateCard = ({ templateId }) => {
  const handleViewClick = () => {
    // Construct the URL for the "View" button
    const viewURL = `http://localhost:3001/publish/${templateId}`;
    
    // Redirect to the viewURL
    window.location.href = viewURL;
  };
  const handleEditClick =()=>{
        const editURL = `http://localhost:5173/Builder/${templateId}`;
        window.location.href = editURL;
  }

  return (
    <Card
      title="Template Preview"
      style={{ marginTop: "10%" }}
      actions={[
        <Button type="default" icon={<EyeOutlined />} key="view" onClick={handleViewClick}>View</Button>,
        <Button type="primary" icon={<EditOutlined />} key="edit" onClick={handleEditClick}>Edit</Button>,
      ]}
    >
      <iframe
        src={`http://localhost:3001/publish/${templateId}`}
        title={`Template - ${templateId}`}
        style={{ width: "100%", height: "400px", border:"none", borderRadius: "4px" }}
        sandbox="allow-scripts allow-same-origin"
      ></iframe>
    </Card>
  );
};

export default TemplateCard;
