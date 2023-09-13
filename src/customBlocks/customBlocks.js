export const defineCustomBlocks = (editor) => {
  const editorBlockManager = editor.BlockManager;
  editorBlockManager.add('input-label-block', {
    label: 'Input Label',
    category: 'Styled Components',
    content: `
        <div class="input-label-block" >
          <div class="input-label-row">
            <label class="input-label" for="name">Name:</label>
            <input class="input-field" type="text" id="name">
          </div>
        </div>
      `,
  });

  editorBlockManager.add('styled-faq', {
    label: 'Styled FAQ',
    category: 'Styled Components',
    content: `
        <div class="styled-faq">
          <h2 class="faq-heading">Frequently Asked Questions</h2>
          <div class="faq-item">
            <h3>Question 1:</h3>
            <p>Answer to Question 1</p>
          </div>
        </div>
      `,
  });
};
