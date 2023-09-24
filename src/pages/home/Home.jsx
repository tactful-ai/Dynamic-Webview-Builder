import { useEffect, useState } from "react";
import { Row, Col,Button  } from "antd";
import { EyeOutlined, EditOutlined } from '@ant-design/icons';

import TemplateCard from "/src/templates/templateCard";

export const Home = () => {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/templates")
      .then((response) => response.json())
      .then((data) => setTemplates(data))
      .catch((error) => console.error("Error fetching templates:", error));
  }, []);

  return (
    <div>
      <h1>Your Templates</h1>
      <Row gutter={16}>
        {templates.map((template) => (
          <Col span={8} key={template._id}>
            <TemplateCard templateId={template._id} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

