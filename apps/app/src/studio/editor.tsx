import type { EbookDoc } from "@selfgrow/shared";
import Image from "@tiptap/extension-image";
import { TableKit } from "@tiptap/extension-table";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useRef } from "react";
import { Callout } from "./callout";

/**
 * Editor blok Tiptap (BLUEPRINT bagian 5). Hanya dimuat di Studio (lazy).
 * `doc` hanya dipakai sebagai isi awal; panel bab di-remount per bab.
 */
export function ChapterEditor({
  doc,
  onChange,
}: {
  doc: EbookDoc;
  onChange: (doc: EbookDoc) => void;
}) {
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
        codeBlock: false,
        link: {
          openOnClick: false,
          autolink: true,
          protocols: ["https", "http", "mailto"],
          isAllowedUri: (url) => /^(https?:\/\/|mailto:)/i.test(url),
        },
      }),
      Image,
      Callout,
      TableKit.configure({ table: { resizable: false } }),
    ],
    content: doc,
    onUpdate: ({ editor: e }) => onChangeRef.current(e.getJSON() as EbookDoc),
  });

  if (!editor) return null;

  const btn = (label: string, active: boolean, run: () => void, title?: string) => (
    <button
      type="button"
      className={`tb${active ? " tb-on" : ""}`}
      onMouseDown={(e) => e.preventDefault()}
      onClick={run}
      title={title ?? label}
    >
      {label}
    </button>
  );
  const chain = () => editor.chain().focus();

  return (
    <div className="editor">
      <div className="toolbar" role="toolbar" aria-label="Format">
        {btn("B", editor.isActive("bold"), () => chain().toggleBold().run(), "Tebal")}
        {btn("I", editor.isActive("italic"), () => chain().toggleItalic().run(), "Miring")}
        {btn(
          "U",
          editor.isActive("underline"),
          () => chain().toggleUnderline().run(),
          "Garis bawah",
        )}
        {btn("H2", editor.isActive("heading", { level: 2 }), () =>
          chain().toggleHeading({ level: 2 }).run(),
        )}
        {btn("H3", editor.isActive("heading", { level: 3 }), () =>
          chain().toggleHeading({ level: 3 }).run(),
        )}
        {btn("• Daftar", editor.isActive("bulletList"), () => chain().toggleBulletList().run())}
        {btn("1. Daftar", editor.isActive("orderedList"), () => chain().toggleOrderedList().run())}
        {btn("❝ Kutipan", editor.isActive("blockquote"), () => chain().toggleBlockquote().run())}
        {btn("💡 Tips", editor.isActive("callout"), () => {
          if (editor.isActive("callout")) chain().lift("callout").run();
          else chain().wrapIn("callout", { variant: "tip" }).run();
        })}
        {btn("🔗 Tautan", editor.isActive("link"), () => {
          const prev = editor.getAttributes("link").href as string | undefined;
          const url = window.prompt("Alamat tautan (https://…)", prev ?? "https://");
          if (url === null) return;
          if (url === "") chain().unsetLink().run();
          else if (/^(https?:\/\/|mailto:)/i.test(url)) chain().setLink({ href: url }).run();
          else window.alert("Tautan harus diawali https:// atau mailto:");
        })}
        {btn("🖼 Gambar", false, () => {
          const src = window.prompt("Alamat gambar (https://…)");
          if (!src) return;
          if (!/^https:\/\//.test(src)) return window.alert("Gambar harus dari alamat https://");
          const alt = window.prompt("Keterangan gambar (untuk aksesibilitas)") ?? "";
          chain().setImage({ src, alt }).run();
        })}
        {btn("―", false, () => chain().setHorizontalRule().run(), "Garis pemisah")}
        {btn("▦ Tabel", editor.isActive("table"), () =>
          chain().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
        )}
        {editor.isActive("table") && (
          <>
            {btn("+ Baris", false, () => chain().addRowAfter().run())}
            {btn("+ Kolom", false, () => chain().addColumnAfter().run())}
            {btn("− Baris", false, () => chain().deleteRow().run())}
            {btn("− Kolom", false, () => chain().deleteColumn().run())}
            {btn("Hapus tabel", false, () => chain().deleteTable().run())}
          </>
        )}
        {btn("↶", false, () => chain().undo().run(), "Urungkan")}
        {btn("↷", false, () => chain().redo().run(), "Ulangi")}
      </div>
      <EditorContent editor={editor} className="editor-body ebook-content" />
    </div>
  );
}
