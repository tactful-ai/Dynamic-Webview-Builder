import { Card, Button } from "antd";

const TemplateCard = ({ template, onViewClick, onEditClick }) => {
  const content = template.content;
  const style = template.style;

  const contentElement = document.createElement("div");
  contentElement.innerHTML = content;

  const styleElement = document.createElement("style");
  styleElement.innerHTML = style;
  contentElement.appendChild(styleElement);

  return (
    <Card
      title="Template Preview"
      extra={
        <div>
          <Button type="primary" onClick={() => onViewClick(template)}>
            View
          </Button>
          <Button onClick={() => onEditClick(template)}>Edit</Button>
        </div>
      }
    >
      {/* url template */}
      <div dangerouslySetInnerHTML={{ __html: contentElement.innerHTML }} />
    </Card>
  );
};

export default TemplateCard;
