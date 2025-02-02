import { v4 as uuidv4 } from 'uuid';
import { createClient } from '../utils/supabase/client';

const supabase = createClient()

export async function uploadImage(fileOrBase64: File | string): Promise<string> {
  try {
    // Handle base64 string
    if (typeof fileOrBase64 === 'string' && fileOrBase64.startsWith('data:image')) {
      // Convert base64 to file
      const response = await fetch(fileOrBase64);
      const blob = await response.blob();
      const file = new File([blob], `image-${Date.now()}.${blob.type.split('/')[1]}`, {
        type: blob.type,
      });
      return await uploadFileToStorage(file);
    }
    
    // Handle regular file upload
    else if (fileOrBase64 instanceof File) {
      return await uploadFileToStorage(fileOrBase64);
    }
    
    throw new Error('Invalid input: Must be either a File or base64 image string');
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Failed to upload image');
  }
}

async function uploadFileToStorage(file: File): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${uuidv4()}.${fileExt}`;
  const filePath = `articles/${fileName}`;

  // Check file size (limit to 5MB)
  if (file.size > 5 * 1024 * 1024) {
    throw new Error('File size exceeds 5MB limit');
  }

  // Verify file type
  if (!file.type.startsWith('image/')) {
    throw new Error('Invalid file type. Only images are allowed.');
  }

  // Upload to Supabase storage
  const { error: uploadError, data } = await supabase.storage
    .from('stf_foundation')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (uploadError) {
    console.error('Storage upload error:', uploadError);
    throw new Error('Error uploading image to storage');
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('articles')
    .getPublicUrl(filePath);

  return publicUrl;
}

export async function saveArticle(articleData: {
  title: string;
  description: string;
  content: string;
  featured_image_url: string;
  status: 'draft' | 'published';
  author_name: string;
}) {
  const { error, data } = await supabase
    .from('articles')
    .insert({
        title: articleData.title,
        description: articleData.description,
        content: articleData.content,
        featured_image_url: articleData.featured_image_url,
        status: articleData.status,
        author_name: articleData.author_name
    })

  if (error) throw error;
  return data;
}

export async function updateArticle(
  id: string,
  articleData: Partial<{
    title: string;
    description: string;
    content: string;
    featured_image_url: string;
    status: 'draft' | 'published';
    author_name: string;
    author_bio?: string;
  }>
) {
  const updates = {
    ...articleData,
    published_at: 
      articleData.status === 'published' 
        ? new Date().toISOString() 
        : articleData.status === 'draft' 
          ? null 
          : undefined,
  };

  const { error, data } = await supabase
    .from('articles')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}