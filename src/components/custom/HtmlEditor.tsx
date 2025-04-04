import React, { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { sanitizeHtml } from '@/utils/html-helpers';
import { newsService } from '@/services/newsService';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TiptapToolbar from './HtmlFormatButtons';
import { TextAlign } from './tiptap-extensions/TextAlign';

interface HtmlEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  rows?: number;
}

const HtmlEditor: React.FC<HtmlEditorProps> = ({
  content,
  onChange,
  placeholder = 'Nhập nội dung chi tiết bài viết...',
  rows = 15
}) => {
  const [activeTab, setActiveTab] = useState<string>('edit');
  
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          target: '_blank',
          rel: 'noopener noreferrer',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full rounded-md my-4',
        },
        // Cho phép kéo để thay đổi kích thước ảnh
        resizable: true,
        // Sử dụng hàm này để xử lý khi upload hình ảnh trực tiếp từ clipboard
        uploadImage: async (file: File) => {
          try {
            const url = await newsService.uploadImage(file);
            return url;
          } catch (error) {
            console.error('Error uploading image:', error);
            return null;
          }
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      // Thêm extension Text Align để hỗ trợ căn chỉnh
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right', 'justify'],
        defaultAlignment: 'left',
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: `min-h-[${rows * 24}px] p-4 focus:outline-none prose prose-sm max-w-none`,
      },
      // Hỗ trợ paste hình ảnh trực tiếp
      handlePaste: (view, event) => {
        const items = Array.from(event.clipboardData?.items || []);
        const imageItems = items.filter(item => /image/.test(item.type));
        
        if (imageItems.length > 0) {
          event.preventDefault();
          const file = imageItems[0].getAsFile();
          
          if (file) {
            // Vị trí hiện tại của con trỏ
            const { selection } = view.state;
            const pos = selection.from;
            
            // Thêm placeholder để chỉ ra đang tải
            const placeholderTr = view.state.tr.insertText('Đang tải hình ảnh...', pos);
            view.dispatch(placeholderTr);
            
            // Tải lên hình ảnh
            newsService.uploadImage(file)
              .then(url => {
                if (url) {
                  // Xóa placeholder
                  const deleteTr = view.state.tr.delete(
                    pos, 
                    pos + 'Đang tải hình ảnh...'.length
                  );
                  view.dispatch(deleteTr);
                  
                  // Chèn hình ảnh tại vị trí con trỏ
                  view.dispatch(
                    view.state.tr.insert(
                      pos,
                      view.state.schema.nodes.image.create({ src: url })
                    )
                  );
                }
              })
              .catch(error => {
                console.error('Lỗi khi tải ảnh từ clipboard:', error);
                
                // Xóa placeholder và thay bằng thông báo lỗi
                const errorTr = view.state.tr
                  .delete(pos, pos + 'Đang tải hình ảnh...'.length)
                  .insertText('[Lỗi tải ảnh]', pos);
                view.dispatch(errorTr);
              });
            
            return true;
          }
        }
        
        return false;
      },
      // Hỗ trợ drop hình ảnh
      handleDrop: (view, event) => {
        const hasFiles = event.dataTransfer?.files?.length;
        
        if (hasFiles) {
          const images = Array.from(event.dataTransfer.files).filter(file => 
            /image\/(jpeg|png|gif|webp|svg\+xml)/.test(file.type)
          );
          
          if (images.length > 0) {
            event.preventDefault();
            
            // Hiển thị indicator đang tải
            const { state } = view;
            const dropPos = view.posAtCoords({
              left: event.clientX,
              top: event.clientY,
            });
            
            if (!dropPos) return true;
            
            // Thêm placeholder cho ảnh đang tải
            const placeholderTransaction = state.tr.insert(
              dropPos.pos,
              state.schema.nodes.paragraph.create(
                {},
                state.schema.text('Đang tải hình ảnh lên...')
              )
            );
            view.dispatch(placeholderTransaction);
            
            // Vị trí mới sau khi thêm placeholder
            const placeholderPos = dropPos.pos;
            
            // Xử lý mỗi ảnh
            Promise.all(
              images.map(image => 
                newsService.uploadImage(image)
                  .then(url => ({ success: true, url }))
                  .catch(error => {
                    console.error('Lỗi khi tải ảnh:', error);
                    return { success: false, error };
                  })
              )
            ).then(results => {
              // Xóa placeholder
              const removePlaceholderTransaction = view.state.tr.delete(
                placeholderPos, 
                placeholderPos + 30
              );
              view.dispatch(removePlaceholderTransaction);
              
              // Thêm ảnh đã tải thành công
              results.forEach(result => {
                if (result.success && result.url) {
                  const imageNode = view.state.schema.nodes.image.create({ src: result.url });
                  const insertTransaction = view.state.tr.insert(placeholderPos, imageNode);
                  view.dispatch(insertTransaction);
                }
              });
              
              // Nếu có lỗi, thông báo
              const errors = results.filter(r => !r.success);
              if (errors.length > 0) {
                console.error(`${errors.length} hình ảnh không thể tải lên`);
                // Có thể thêm thông báo lỗi cho người dùng ở đây
              }
            });
            
            return true;
          }
        }
        
        return false;
      },
    },
  });

  // Ensure editor content stays in sync with the content prop
  useEffect(() => {
    if (editor && content === '' && editor.getHTML() !== '<p></p>') {
      editor.commands.setContent('');
    }
  }, [content, editor]);

  return (
    <Tabs defaultValue="edit" value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-2">
        <TabsTrigger value="edit">Soạn thảo</TabsTrigger>
        <TabsTrigger value="preview">Xem trước</TabsTrigger>
      </TabsList>
      <TabsContent value="edit" className="mt-2">
        <div className="border rounded-md overflow-hidden">
          {editor && <TiptapToolbar editor={editor} />}
          <div className="tiptap-editor">
            <EditorContent editor={editor} />
          </div>
        </div>
      </TabsContent>
      <TabsContent value="preview" className="border rounded-md p-4 mt-2 min-h-[300px]">
        {content ? (
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }}
          />
        ) : (
          <div className="text-gray-400 italic">Chưa có nội dung để xem trước</div>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default HtmlEditor; 
