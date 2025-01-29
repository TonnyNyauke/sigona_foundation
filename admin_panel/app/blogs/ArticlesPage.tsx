'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import React, { FormEvent, useRef, useState } from 'react';
import { useEditor, EditorContent, Editor, FloatingMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Heading from '@tiptap/extension-heading';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Strike from '@tiptap/extension-strike';
import Code from '@tiptap/extension-code';
import CodeBlock from '@tiptap/extension-code-block';
import ListItem from '@tiptap/extension-list-item';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import ImageResizer from './ImageResizer';
import Placeholder from '@tiptap/extension-placeholder';
import { Button } from '@/components/ui/button';
import { AlertCircle, ImageIcon, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

// interface MenuBarProps {
//   editor: Editor | null;
//   uploadImage: (file: File) => Promise<string | undefined>;
// }

//Helper function to extract image urls from HTML content
const extractImageUrls = (htmlContent: string) =>   {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, 'text/html');
  const images = doc.getElementsByTagName('img');

  return Array.from(images).map(img => img.src)
}

//Function to check if url is a base64 image
const isBase64Image = (url: string): boolean => {
  return url.startsWith('data: image')
}

//Function to convert base64 to file
// const base64ToFile = async (base64String: string): Promise<File> => {
//   const response = await fetch(base64String)
//   const blob = await response.blob();

//   return new File([blob], `image-${Date.now()}.png`, {type: blob.type})
// }

//Custom image extensions with resizing controls
const customImage = Image.extend({
  addAttributes(){
    return{
      ...this.parent?.(),
      width: {
        default: '100%',
        renderHTML: (attributes) => ({
          width: attributes.width,
        }),
      },
      height: {
        default: 'auto',
        renderHTML: (attributes) => ({
          height: attributes.height,
        })
      }
    }
  }
})

//Function to upload images and base64 inputs
export async function uploadImage(fileOrBase64: File | string): Promise<string> {

  console.log(fileOrBase64)

  return ""
}

interface ToolbarButtonProps {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}

const ToolbarButton = ({ onClick, active, disabled, children }: ToolbarButtonProps) => (
  <Button
    type="button"
    variant={active ? "secondary" : "ghost"}
    size="sm"
    onClick={onClick}
    disabled={disabled}
    className="h-8 px-3 hover:bg-gray-100"
  >
    {children}
  </Button>
);

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;

  return (
    <div className="sticky top-0 z-50 bg-white border-b border-gray-200 flex flex-wrap items-center gap-1 p-2">
      <div className="flex items-center gap-1 border-r pr-2 mr-2">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          active={editor.isActive('heading', { level: 1 })}
        >
          H1
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive('heading', { level: 2 })}
        >
          H2
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setParagraph().run()}
          active={editor.isActive('paragraph')}
        >
          ¶
        </ToolbarButton>
      </div>

      <div className="flex items-center gap-1 border-r pr-2 mr-2">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive('bold')}
        >
          B
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive('italic')}
        >
          I
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive('strike')}
        >
          S
        </ToolbarButton>
      </div>

      <div className="flex items-center gap-1 border-r pr-2 mr-2">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive('bulletList')}
        >
          • List
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive('orderedList')}
        >
          1. List
        </ToolbarButton>
      </div>

      <div className="flex items-center gap-1">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          active={editor.isActive('codeBlock')}
        >
          {'</>'}
        </ToolbarButton>
        <ToolbarButton
          onClick={() => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = async (event) => {
              const file = (event.target as HTMLInputElement).files?.[0];
              if (file) {
                const url = await uploadImage(file);
                if (url) {
                  editor.chain().focus().setImage({ src: url }).run();
                }
              }
            };
            input.click();
          }}
        >
          <ImageIcon className="w-4 h-4" />
        </ToolbarButton>
      </div>
    </div>
  );
};

function ArticlesPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  //state to track if the form should actually submit
  const [readyToSubmit, setReadyToSubmit] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Document,
      Paragraph,
      Text,
      Heading,
      Bold,
      Italic,
      Strike,
      Code,
      CodeBlock,
      ListItem,
      BulletList,
      OrderedList,
      Link.configure({
        openOnClick: false,
      }),
      customImage.configure({
        inline: true,
        allowBase64: true,
      }),
      Placeholder.configure({
        placeholder: 'Start writing your story...',
      }),
    ],
    content: '',
    // Set immediatelyRender to false to avoid SSR issues
    immediatelyRender: false,
  });

  <FloatingMenu editor={editor} className="floating-menu">
  {editor && (
    <div className="bg-white shadow-lg rounded-lg p-2 flex gap-2 border">
      <Button
      type='button'
        onClick={async (e) => {
          e.preventDefault(); // Prevent any form submission
          e.stopPropagation(); // Stop event bubbling
          const input = document.createElement('input');
          input.type = 'file';
          input.accept = 'image/*';
          input.onchange = async (event) => {
            const file = (event.target as HTMLInputElement).files?.[0];
            if (file) {
              const url = await uploadImage(file);
              if (url) {
                editor.chain().focus().setImage({ src: url }).run();
              }
            }
          };
          input.click();
        }}
        className="p-2 hover:bg-gray-100 rounded"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <polyline points="21 15 16 10 5 21"/>
        </svg>
      </Button>
      {/* Add other formatting buttons here */}
    </div>
  )}
</FloatingMenu>

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setError(null);
    const fileInput = e.target;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      if (file.type.startsWith('image/')) {
        try {
          const downloadURL = await uploadImage(file);
          if (downloadURL) {
            setFileUrl(downloadURL);
          } else {
            setError('Error uploading image: no download URL received');
          }
        } catch (error) {
          setError(`Error uploading image: ${error}`);
        }
      } else {
        setError('Please upload an image file');
      }
    }
  }

 

  async function handleFormSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

     // Only proceed if the submit button was explicitly clicked
    if (!readyToSubmit) {
      return;
    }


    setError(null);
    setIsSubmitting(true);
  
    try {
      const editorContent = editor?.getHTML();
  
      if (!title.trim()) {
        throw new Error('Please enter a title');
      }
  
      if (!description.trim()) {
        throw new Error('Please enter a description');
      }
  
      if (!editorContent || editorContent === '<p></p>') {
        throw new Error('Please add some content to your article');
      }
  
      if (!fileUrl) {
        throw new Error('Please upload a featured image');
      }
  
      // Extract all image URLs from the editor content
      const imageUrls = extractImageUrls(editorContent);
      let processedContent = editorContent;
  
      // Upload any base64 images and replace their URLs in the content
      for (const url of imageUrls) {
        if (isBase64Image(url)) {
          const uploadedUrl = await uploadImage(url);
          processedContent = processedContent.replace(url, uploadedUrl);
        }
      }
  
      // const articleData = {
      //   title: title.trim(),
      //   description: description.trim(),
      //   content: processedContent, // Use the processed content with uploaded image URLs
      //   fileUrl,
      //   createdAt: new Date().toISOString(),
      //   updatedAt: new Date().toISOString(),
      // };
  
      // Reset form
      setTitle('');
      setDescription('');
      setFileUrl('');
      setReadyToSubmit(false); // Reset the submit flag
      editor?.commands.clearContent();
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
  
      alert(`Article published successfully! Document ID:`);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create New Article</h1>
          <Button
            type="button"
            variant="outline"
            onClick={() => {/* Add preview functionality */}}
            className="mr-4"
          >
            Preview
          </Button>
        </div>

        {error && (
          <div className="mb-6 flex items-center gap-2 p-4 text-red-700 bg-red-50 rounded-lg">
            <AlertCircle className="w-5 h-5" />
            <p>{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardContent className="p-6">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <Input
                    type="text"
                    placeholder="Article Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="text-2xl font-bold border-0 border-b focus:ring-0 rounded-none px-0"
                  />
                </div>

                <div className="border rounded-lg overflow-hidden bg-white">
                  <MenuBar editor={editor} />
                  <div className="p-4 min-h-[500px] prose max-w-none">
                    <EditorContent editor={editor} />
                    {editor && <ImageResizer editor={editor} />}
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <Button type="button" variant="outline">
                    Save Draft
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="min-w-[120px]"
                    onClick={() => setReadyToSubmit(true)}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Publishing...
                      </div>
                    ) : (
                      'Publish'
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Featured Image
                </label>
                <div
                  className={`border-2 border-dashed rounded-lg p-4 transition-colors ${
                    isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                  }`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={async (e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    const file = e.dataTransfer.files[0];
                    if (file && file.type.startsWith('image/*')) {
                      const url = await uploadImage(file);
                      if (url) setFileUrl(url);
                    }
                  }}
                >
                  {fileUrl ? (
                    <div className="relative">
                      <img
                        src={fileUrl}
                        alt="Featured"
                        className="w-full h-48 object-cover rounded"
                      />
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => setFileUrl('')}
                      >
                        Change
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-2">
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          Select Image
                        </Button>
                        <Input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          accept="image/*"
                          className="hidden"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        or drag and drop
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <Textarea
                  placeholder="Write a brief description of your article..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="resize-none"
                  rows={4}
                />
                <p className="text-xs text-gray-500 mt-1">
                  This will appear in article previews and search results.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ArticlesPage;