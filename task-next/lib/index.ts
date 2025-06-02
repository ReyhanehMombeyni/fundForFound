export function convertEditorJSToStrapiBlocks(editorData) {
    return editorData.blocks.map(block => {
      switch (block.type) {
        case 'paragraph':
          return {
            type: 'paragraph',
            children: [{ text: block.data.text }]
          };
        case 'header':
          return {
            type: 'heading',
            level: block.data.level,
            children: [{ text: block.data.text }]
          };
        case 'list':
          return {
            type: 'list',
            format: block.data.style === 'ordered' ? 'number' : 'bullet',
            children: block.data.items.map(item => ({
              type: 'list-item',
              children: [{ text: item }]
            }))
          };
        default:
          return {
            type: 'paragraph',
            children: [{ text: `[Unsupported block: ${block.type}]` }]
          };
      }
    });
  }
  