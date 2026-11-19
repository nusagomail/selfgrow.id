import { mergeAttributes, Node } from "@tiptap/core";

/** Blok callout/tips (BLUEPRINT bagian 5). Varian: tip, info, warning. */
export const Callout = Node.create({
  name: "callout",
  group: "block",
  content: "block+",
  defining: true,
  addAttributes() {
    return {
      variant: {
        default: "tip",
        parseHTML: (el) => el.getAttribute("data-variant") ?? "tip",
        renderHTML: (attrs) => ({ "data-variant": attrs.variant }),
      },
    };
  },
  parseHTML() {
    return [{ tag: "aside[data-callout]" }];
  },
  renderHTML({ HTMLAttributes, node }) {
    return [
      "aside",
      mergeAttributes(HTMLAttributes, {
        "data-callout": "",
        class: `callout callout-${node.attrs.variant}`,
      }),
      0,
    ];
  },
});
