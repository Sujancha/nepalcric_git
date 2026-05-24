'use client';

import { useEditor, EditorContent, Node } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import { Color } from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import { 
  Bold, Italic, Strikethrough, Heading1, Heading2, Heading3, 
  Quote, AlignLeft, AlignCenter, AlignRight, AlignJustify, 
  ImageIcon, MessageSquareQuote
} from 'lucide-react';
import { useCallback } from 'react';

// Custom Pull Quote Extension
const PullQuote = Node.create({
  name: 'pullQuote',
  group: 'block',
  content: 'inline*',
  
  parseHTML() {
    return [{ tag: 'div[data-type="pull-quote"]' }];
  },
  
  renderHTML({ HTMLAttributes }) {
    return ['div', { ...HTMLAttributes, 'data-type': 'pull-quote', class: 'custom-pull-quote' }, 0];
  },
  
  addCommands() {
    return {
      setPullQuote: () => ({ commands }: { commands: any }) => {
        return commands.toggleNode(this.name, 'paragraph');
      },
    } as any;
  },
});

const MenuBar = ({ editor }: { editor: any }) => {
  const addImage = useCallback(() => {
    if (!editor) return;
    const url = window.prompt('URL of the image:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const togglePullQuote = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().setPullQuote().run();
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 border-b border-white/10 bg-[#07080f] rounded-t-lg sticky top-0 z-10">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`p-2 rounded ${editor.isActive('bold') ? 'bg-[#C41E3A] text-white' : 'text-gray-400 hover:bg-white/10'}`}
        title="Bold"
      >
        <Bold size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`p-2 rounded ${editor.isActive('italic') ? 'bg-[#C41E3A] text-white' : 'text-gray-400 hover:bg-white/10'}`}
        title="Italic"
      >
        <Italic size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={`p-2 rounded ${editor.isActive('strike') ? 'bg-[#C41E3A] text-white' : 'text-gray-400 hover:bg-white/10'}`}
        title="Strikethrough"
      >
        <Strikethrough size={16} />
      </button>

      <div className="w-px h-6 bg-white/10 mx-2" />

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`p-2 rounded ${editor.isActive('heading', { level: 1 }) ? 'bg-[#C41E3A] text-white' : 'text-gray-400 hover:bg-white/10'}`}
        title="Heading 1"
      >
        <Heading1 size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-2 rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-[#C41E3A] text-white' : 'text-gray-400 hover:bg-white/10'}`}
        title="Heading 2"
      >
        <Heading2 size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`p-2 rounded ${editor.isActive('heading', { level: 3 }) ? 'bg-[#C41E3A] text-white' : 'text-gray-400 hover:bg-white/10'}`}
        title="Heading 3"
      >
        <Heading3 size={16} />
      </button>

      <div className="w-px h-6 bg-white/10 mx-2" />

      <button
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={`p-2 rounded ${editor.isActive({ textAlign: 'left' }) ? 'bg-[#C41E3A] text-white' : 'text-gray-400 hover:bg-white/10'}`}
        title="Align Left"
      >
        <AlignLeft size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={`p-2 rounded ${editor.isActive({ textAlign: 'center' }) ? 'bg-[#C41E3A] text-white' : 'text-gray-400 hover:bg-white/10'}`}
        title="Align Center"
      >
        <AlignCenter size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={`p-2 rounded ${editor.isActive({ textAlign: 'right' }) ? 'bg-[#C41E3A] text-white' : 'text-gray-400 hover:bg-white/10'}`}
        title="Align Right"
      >
        <AlignRight size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        className={`p-2 rounded ${editor.isActive({ textAlign: 'justify' }) ? 'bg-[#C41E3A] text-white' : 'text-gray-400 hover:bg-white/10'}`}
        title="Justify"
      >
        <AlignJustify size={16} />
      </button>

      <div className="w-px h-6 bg-white/10 mx-2" />

      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`p-2 rounded ${editor.isActive('blockquote') ? 'bg-[#C41E3A] text-white' : 'text-gray-400 hover:bg-white/10'}`}
        title="Blockquote"
      >
        <Quote size={16} />
      </button>
      
      {/* Custom Pull Quote Button */}
      <button
        onClick={togglePullQuote}
        className={`p-2 rounded ${editor.isActive('pullQuote') ? 'bg-[#1E3A8A] text-white border border-[#C41E3A]' : 'text-gray-400 hover:bg-white/10'}`}
        title="Pull Quote / Callout"
      >
        <MessageSquareQuote size={16} />
      </button>

      <button
        onClick={addImage}
        className="p-2 rounded text-gray-400 hover:bg-white/10"
        title="Insert Image"
      >
        <ImageIcon size={16} />
      </button>

      <div className="w-px h-6 bg-white/10 mx-2" />
      <input
        type="color"
        onInput={event => editor.chain().focus().setColor((event.target as HTMLInputElement).value).run()}
        value={editor.getAttributes('textStyle').color || '#B0B8C8'}
        className="w-8 h-8 rounded border-none cursor-pointer bg-transparent p-0"
        title="Text Color"
      />
    </div>
  );
};

export default function AdminEditor({ content, onChange }: { content: string, onChange: (html: string) => void }) {
  // Convert old plain text/markdown into paragraphs so it doesn't bunch up
  let initialContent = content;
  if (initialContent && !initialContent.includes('<p>') && !initialContent.includes('<h')) {
    initialContent = initialContent.split('\n').filter(l => l.trim()).map(l => `<p>${l}</p>`).join('');
  }

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Color,
      TextStyle,
      PullQuote,
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class: 'prose prose-invert prose-p:font-mukta prose-headings:font-bebas max-w-none min-h-[400px] p-6 focus:outline-none',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="bg-[#0f111a] border border-white/10 rounded-lg shadow-xl flex flex-col w-full">
      <MenuBar editor={editor} />
      
      <div className="flex-1 overflow-y-auto bg-black/20 editor-container">
        <EditorContent editor={editor} />
      </div>

      <style jsx global>{`
        .editor-container .custom-pull-quote {
          font-family: 'Mukta', sans-serif;
          font-size: 1.5rem;
          font-style: italic;
          font-weight: 700;
          color: #C41E3A;
          text-align: center;
          margin: 2rem 0;
          padding: 1.5rem;
          border-top: 2px solid #1E3A8A;
          border-bottom: 2px solid #1E3A8A;
          background: rgba(30, 58, 138, 0.1);
          position: relative;
        }
        .editor-container .custom-pull-quote::before {
          content: '“';
          position: absolute;
          top: -20px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 4rem;
          color: rgba(196, 30, 58, 0.3);
          font-family: Georgia, serif;
        }
        .editor-container img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .editor-container img[style*="float: left"] {
          margin: 0 1.5rem 1rem 0;
        }
        .editor-container img[style*="float: right"] {
          margin: 0 0 1rem 1.5rem;
        }
        .editor-container p {
          font-family: var(--font-mukta), sans-serif;
          color: #B0B8C8;
          font-size: 15px;
          line-height: 1.85;
          margin-bottom: 1.5rem;
        }
        .editor-container h1, .editor-container h2, .editor-container h3 {
          font-family: var(--font-bebas), sans-serif;
          color: #C41E3A;
          letter-spacing: 0.05em;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        .editor-container blockquote {
          border-left: 4px solid #C9A84C;
          padding-left: 2rem;
          margin: 1rem 0;
          background: linear-gradient(to right, rgba(201, 168, 76, 0.08), transparent);
          padding-top: 1.25rem;
          padding-bottom: 1.25rem;
        }
        .editor-container blockquote p {
          font-style: italic;
          color: #E8E8E8;
          font-size: 17px;
          margin-bottom: 0;
        }
      `}</style>
    </div>
  );
}
