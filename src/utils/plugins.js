import { itemDetailsBlock } from "/src/customBlocks/itemDetails";

export const editorPlugins = [
  {
    id: 'gjs-blocks-basic',
    src: 'https://unpkg.com/grapesjs-blocks-basic',
  },
  {
    id: 'grapesjs-plugin-forms',
    src: 'https://unpkg.com/grapesjs-plugin-forms',
  },
  {
    id: 'grapesjs-custom-code',
    src: 'https://unpkg.com/grapesjs-custom-code',
  },
  {
    id: 'grapesjs-tooltip',
    src: 'https://unpkg.com/grapesjs-tooltip',
  },
  {
    id: 'grapesjs-tabs',
    src: 'https://unpkg.com/grapesjs-tabs',
  },
  {
    id: 'grapesjs-navbar',
    src: 'https://unpkg.com/grapesjs-navbar',
  },
  {
    id: 'grapesjs-component-countdown',
    src: 'https://unpkg.com/grapesjs-component-countdown',
  },
  {
    id: 'grapesjs-component-code-editor',
    src: "https://unpkg.com/grapesjs-component-code-editor",
  },
  itemDetailsBlock,
];
