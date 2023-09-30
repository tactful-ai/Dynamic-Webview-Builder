export const defineCustomBlocks = (editor) => {
  const editorBlockManager = editor.BlockManager;
  editorBlockManager.add('input-label-block', {
    label: 'Input Label',
    category: 'Styled Components',
    attributes: { class: "fa fa-pencil-square-o" },
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
    label: 'Create FAQ',
    category: 'Styled Components',
    attributes: { class: "fa fa-comments-o" },
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
