# Frontend - Builder Component

The frontend of the application is developed using React and incorporates the GrapesJS library for template building and customization. The builder component allows users to create and edit templates visually.

## Builder Component Overview

The `Builder` component is a crucial part of the frontend. It integrates various features and functionalities to provide a seamless template-building experience.

### Dependencies

The `Builder` component relies on several external dependencies, including:

- React: The core library for building the user interface.
- react-router-dom: For handling routing within the application.
- GrapesJS: A powerful library for building web templates with a visual editor.
- Ant Design (message): For displaying messages and notifications.
- @eisberg-labs/mui-copy-field: A component for copying content to the clipboard.
- plugins for the components and custom components

### Initialization and Data Retrieval

```javascript
const { templateId } = useParams();

const [generatedLink, setGeneratedLink] = useState("");

const copyToClipboard = () => {
  // ...
};

useEffect(() => {
  const fetchTemplateData = async () => {
    // ...
  };

  fetchTemplateData();
}, [templateId]);
```

- The `templateId` is extracted from the route parameters using `useParams` from `react-router-dom`. This parameter helps identify the template being edited.

- The `generatedLink` state variable is used to store the link to the published template, and the `copyToClipboard` function is used to copy the link to the clipboard.

- Upon component initialization, a `useEffect` fetches template data associated with the `templateId` from the backend API (`http://localhost:3001/templates/{templateId}`). The retrieved data is then stored in `localStorage` for later use.

### GrapesJS Integration

```javascript
const onEditor = (editor) => {
  // ...
};
```

- The GrapesJS editor is rendered using the `GjsEditor` component. It is configured with various options and plugins required for template editing. The `onEditor` function is provided as a callback to perform additional setup.

### Custom Buttons and Commands

```javascript
// Update Button
editorCommands.add("update", function (editor, sender) {
  // ...
});

// Publish Button
editorCommands.add("publish", function (editor, sender) {
  // ...
});
```

- The `update` and `publish` commands are added to the GrapesJS editor. These commands are used to update and publish templates, respectively. They are bound to specific buttons in the editor's interface.

### Custom Blocks

```javascript
defineFormBlocks(editor);
faqContent(editor);
customButton(editor);
customInput(editor);
itemDetailsBlock(editor);
defineCustomBlocks(editor);
defineTicket(editor);
```

- Custom block definitions, including FAQ content, buttons, inputs, item details, and more, are added to the editor. These custom blocks provide users with pre-defined components that can be easily incorporated into their templates.

### Generated Link Display

```javascript
<CopyField
  type="text"
  value={generatedLink}
  readOnly
  label="Generated Link"
  onCopySuccess={copyToClipboard}
  style={{
    width: "500px",
    marginBottom: "5px",
  }}
/>
```

- The `generatedLink` is displayed using the `CopyField` component. This component allows users to copy the link to the clipboard by clicking a button.

## Conclusion

The `Builder` component plays a pivotal role in the frontend of the application, enabling users to create, edit, and publish templates with ease. Its integration with GrapesJS, along with custom blocks and buttons, provides a powerful and user-friendly template-building experience.
