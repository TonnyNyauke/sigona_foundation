import { v4 as uuidv4 } from 'uuid';
import { createClient } from '../utils/supabase/client';

const supabase = createClient()

export async function uploadImage(file: File): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${uuidv4()}.${fileExt}`;
  const filePath = `article-images/${fileName}`;

  const { error: uploadError, data } = await supabase.storage
    .from('articles')
    .upload(filePath, file);

  if (uploadError) {
    throw new Error('Error uploading image');
  }

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