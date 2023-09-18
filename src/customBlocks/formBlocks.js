export const defineFormBlocks = (editor) => {
  const editorBlockManager = editor.BlockManager;

  //form components
  const textBlock = editorBlockManager.get("text");
  textBlock.set({
    label: "Text",
    content: `
          <p style="font-family:sans-serif;">Insert your Text here</p>
          `,
  });

  const inputBlock = editorBlockManager.get("input");
  inputBlock.set({
    label: "Input",
    content: `
        <div class="input-container">
        <input style="display: inline-block; width: 75%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; background-color: rgba(0,0,0,0);"></input>
        </div>`,
  });

  const textareaBlock = editorBlockManager.get("textarea");
  textareaBlock.set({
    label: "Textarea",
    content: `
        <div class="textarea-container">
        <textarea style="display: inline-block; width: 75%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; background-color: rgba(0,0,0,0);"></textarea>
        </div>`,
  });

  const selectBlock = editorBlockManager.get("select");
  selectBlock.set({
    label: "Select",
    content: `
        <div class="select-container">
        <select style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; background-color: rgba(0,0,0,0); cursor: pointer;">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
        </div>`,
  });

  const buttonBlock = editorBlockManager.get("button");
  buttonBlock.set({
    label: "Button",
    content: `
          <button style="background-color: green; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer;">
          Click Me
          </button>`,
  });

  const radioBlock = editorBlockManager.get("radio");
  radioBlock.set({
    label: "Radio",
    content: `
        <input type="radio" style="width: 16px; height: 16px; border: 1px solid #ccc; border-radius: 50%; background-color: rgba(0,0,0,0); margin-right: 8px; display: inline; position: relative; cursor: pointer;">
      `,
  });

  const formBlock = editor.BlockManager.get("form");
  formBlock.set({
    label: "Styled Form Block",
    content: `
          <form style="display: flex; flex-direction: column; align-items: center; border: 1px solid #ccc; border-radius: 4px; background-color: #f5f5f5; padding: 20px;">
          <div style="display: flex; flex-direction: row; align-items: center; margin-bottom: 10px;">
          <label for="name">Name:</label>
          <input type="text" id="name" name="name" style="background-color: rgba(0,0,0,0); padding: 8px; border: 1px solid #ccc; border-radius: 4px; margin-right: 10px;" required>
          </div>
  
          <div style="display: flex; flex-direction: row; align-items: center; margin-bottom: 10px;">
          <label for="email">Email:</label>
          <input type="email" id="email" name="email" style="background-color: rgba(0,0,0,0); padding: 8px; border: 1px solid #ccc; border-radius: 4px; margin-right: 10px;" required>
          </div>
  
          <div style="display: flex; flex-direction: row; align-items: center; margin-bottom: 10px;">
          <label for="gender">Gender:</label>
          <select id="gender" name="gender" style="background-color: rgba(0,0,0,0); padding: 8px; border: 1px solid #ccc; border-radius: 4px; margin-right: 10px;">
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
          </select>
          </div>
  
          <div style="display: flex; flex-direction: row; align-items: center; margin-bottom: 10px;">
          <label for="message">Message:</label>
          <textarea id="message" name="message" style="background-color: rgba(0,0,0,0); padding: 8px; border: 1px solid #ccc; border-radius: 4px; margin-right: 10px;" required></textarea>
          </div>
  
          <button type="submit" style="background-color: green; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer;">Submit</button>
          </form>
      `,
  });

formBlock.set({
  label: "Custom Form Block",
  content: `
    <form style="display: flex; flex-direction: column; align-items: center; border: 1px solid #ccc; border-radius: 4px; background-color: #f5f5f5; padding: 20px;">
      <div style="display: flex; flex-direction: row; align-items: center; margin-bottom: 10px;">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" style="background-color: rgba(0,0,0,0); padding: 8px; border: 1px solid #ccc; border-radius: 4px; margin-right: 10px;" required>
      </div>

      <div style="display: flex; flex-direction: row; align-items: center; margin-bottom: 10px;">
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" style="background-color: rgba(0,0,0,0); padding: 8px; border: 1px solid #ccc; border-radius: 4px; margin-right: 10px;" required>
      </div>

      <div style="display: flex; flex-direction: row; align-items: center; margin-bottom: 10px;">
        <label for="client_id">Client ID:</label>
        <input type="text" id="client_id" name="client_id" style="background-color: rgba(0,0,0,0); padding: 8px; border: 1px solid #ccc; border-radius: 4px; margin-right: 10px;" required>
      </div>

      <div style="display: flex; flex-direction: row; align-items: center; margin-bottom: 10px;">
        <label for="client_secret">Client Secret:</label>
        <input type="text" id="client_secret" name="client_secret" style="background-color: rgba(0,0,0,0); padding: 8px; border: 1px solid #ccc; border-radius: 4px; margin-right: 10px;" required>
      </div>

      <div style="display: flex; flex-direction: row; align-items: center; margin-bottom: 10px;">
        <label for="scope">Scope:</label>
        <input type="text" id="scope" name="scope" style="background-color: rgba(0,0,0,0); padding: 8px; border: 1px solid #ccc; border-radius: 4px; margin-right: 10px;" required>
      </div>

      <button type="submit" style="background-color: green; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer;">Submit</button>
    </form>
  `,
});

};
