import { notFound } from 'next/navigation';
import { formatDistanceToNow } from 'date-fns';
import { Clock, Eye, BookOpen, Share2, ArrowLeft } from 'lucide-react';
import InteractiveFeatures from './InteractiveFeatures';
import Image from 'next/image';
import Header from '../../Home/Header';
import Footer from '../../Home/Footer';
import { fetchArticles } from './fetchArticles';
import Link from 'next/link';

// Main Page Component
export default async function ArticlePage({ params }) {
  const article = await fetchArticles(params.id);
  
  if (!article) {
    notFound();
  }
  
  const readingTime = Math.ceil(article.content.split(/\s+/).length / 200);
  const timeAgo = formatDistanceToNow(new Date(article.created_at), { addSuffix: true });
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Breadcrumb */}
      <div className="max-w-3xl mx-auto px-4 py-4 mt-20">
        <Link 
          href="/articles" 
          className="inline-flex items-center text-green-700 hover:text-green-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Articles
        </Link>
      </div>

      <article className="max-w-3xl mx-auto px-4 pb-12">
        {/* Title section */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {article.title}
          </h1>
          
          {/* Enhanced metadata section */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-8 pb-6 border-b">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2 text-green-700" />
              <time dateTime={article.created_at} className="text-gray-600">
                {timeAgo}
              </time>
            </div>
            <div className="flex items-center">
              <BookOpen className="w-4 h-4 mr-2 text-green-700" />
              <span>{readingTime} min read</span>
            </div>
            <div className="flex items-center">
              <Eye className="w-4 h-4 mr-2 text-green-700" />
              <span>{article.views || 0} views</span>
            </div>
            <button 
              className="ml-auto inline-flex items-center px-3 py-1 rounded-full bg-green-50 text-green-700 hover:bg-green-100 transition-colors"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </button>
          </div>

          {/* Description */}
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            {article.description}
          </p>
        </header>

        {/* Featured image */}
        {article.featured_image_url && (
          <div className="mb-12 rounded-xl overflow-hidden shadow-lg">
            <Image
              src={article.featured_image_url}
              alt={article.title}
              width={1200}
              height={600}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        )}

        {/* Interactive features */}
        <div className="sticky top-4 z-10 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm mb-8">
          <InteractiveFeatures 
            readingTime={readingTime} 
            articleSelector="#article-content"
          />
        </div>

        {/* Main content */}
        <div 
          id="article-content"
          className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-green-700 prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
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