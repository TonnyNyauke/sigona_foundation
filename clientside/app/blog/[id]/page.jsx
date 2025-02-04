// app/articles/[id]/page.jsx
import { notFound } from 'next/navigation';
import InteractiveFeatures from './InteractiveFeatures';
import Image from 'next/image';
import Header from '../../Home/Header'
import Footer from '../../Home/Footer'
import { fetchArticles } from './fetchArticles';


// Main Page Component
export default async function ArticlePage({ params }) {
  const article = await fetchArticles(params.id);

  if (!article) {
    notFound(); // Use Next.js notFound for 404 handling
  }

  const readingTime = Math.ceil(article.content.split(/\s+/).length /200) //Calculate reading time

  return (
    <div className='min-h-screen'>
      <Header />
        <article className="max-w-3xl mx-auto px-4 py-8 md:py-12 mt-20">
          {/**Title sections */}
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-quaternary-color mb-4 leading-tight">{article.title}</h1>
            {/**Metadata */}
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
              <div className="flex items-center gap-8">
                {/* {<Clock size={16} />} */}
                <time dateTime={article.created_at}>
                  Published: {new Date(article.created_at).toLocaleDateString()}
                </time>
                <InteractiveFeatures readingTime={readingTime} articleSelector="#article-content"/>
              </div> 
          </div>
          {/**Descrition */}
            <p className="text-gray-600 mb-4">{article.description}</p>
          </header>
          {/**Main content */}
          <div className='prose prose-lg max-w-none'>
            {/**Article content section */}
            <div className='mb-8 leading-relaxed text-quaternary-color space-y-6'>
              {/**If there is a file url */}
              {article.featured_image_url && (
                <div className="my-8 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={article.featured_image_url} 
                    alt="Article content"
                    width={800} height={400} layout="responsive"
                    className="w-full h-auto"
                  />
              </div>
              )}
              {/**If there is a content */}
              <div 
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </div>
          </div>
      </article>
      <Footer />
    </div>
  );
}

// Metadata Generation
export async function generateMetadata({ params }) {
  const article = await fetchArticles(params.id);

  if (!article) {
    return {
      title: 'Article Not Found',
      description: 'The requested article could not be found'
    };
  }

  return {
    title: article.title,
    description: article.description
  };
}

// Static Params Generation (Optional)
export async function generateStaticParams() {
  // If you want to pre-render specific articles
  // Fetch article IDs from your database
  return [];
}