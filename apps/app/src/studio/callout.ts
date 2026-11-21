import { Extension, mergeAttributes, Node } from "@tiptap/core";

/** Blok kotak (BLUEPRINT bagian 5, D40). Varian: lihat CALLOUT_VARIANTS di @selfgrow/shared. */
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

/** Nama tokoh pada kutipan (D40): atribut `cite` di blockquote, tersimpan di JSON bab. */
export const QuoteCite = Extension.create({
  name: "quoteCite",
  addGlobalAttributes() {
    return [
      {
        types: ["blockquote"],
        attributes: {
          cite: {
            default: null,
            parseHTML: (el) => el.getAttribute("data-cite"),
            renderHTML: (attrs) => (attrs.cite ? { "data-cite": attrs.cite } : {}),
          },
        },
      },
    ];
  },
});
