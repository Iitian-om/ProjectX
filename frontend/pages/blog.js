import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: 'Introducing ProjectX: Your AI-Powered Time Management Assistant',
      excerpt: 'Learn how ProjectX combines AI automation with intuitive design to revolutionize how you manage your time and tasks.',
      author: 'ProjectX Team',
      date: 'November 5, 2025',
      category: 'Product Updates',
      readTime: '5 min read',
      image: '📢',
      featured: true,
    },
    {
      id: 2,
      title: 'How n8n Workflows Power Smart Automation in ProjectX',
      excerpt: 'Deep dive into how we leverage n8n automation to create intelligent reminders, notifications, and task management.',
      author: 'Development Team',
      date: 'November 3, 2025',
      category: 'Technical',
      readTime: '8 min read',
      image: '⚡',
      featured: true,
    },
    {
      id: 3,
      title: '10 Productivity Tips for Students Using ProjectX',
      excerpt: 'Maximize your academic success with these proven time management strategies and ProjectX features.',
      author: 'Community Team',
      date: 'November 1, 2025',
      category: 'Tips & Tricks',
      readTime: '6 min read',
      image: '📚',
      featured: false,
    },
    {
      id: 4,
      title: 'Integrating Google Calendar with ProjectX',
      excerpt: 'Step-by-step guide to sync your ProjectX schedule with Google Calendar for seamless cross-platform access.',
      author: 'Support Team',
      date: 'October 28, 2025',
      category: 'Tutorials',
      readTime: '4 min read',
      image: '🔗',
      featured: false,
    },
    {
      id: 5,
      title: 'The Science Behind Smart Reminders',
      excerpt: 'Understanding the psychology of notifications and how ProjectX optimizes reminder timing for maximum effectiveness.',
      author: 'Research Team',
      date: 'October 25, 2025',
      category: 'Research',
      readTime: '10 min read',
      image: '🔔',
      featured: false,
    },
    {
      id: 6,
      title: 'Building a Better Dashboard: UI/UX Insights',
      excerpt: 'Learn about the design decisions that make ProjectX intuitive, accessible, and beautiful.',
      author: 'Design Team',
      date: 'October 20, 2025',
      category: 'Design',
      readTime: '7 min read',
      image: '🎨',
      featured: false,
    },
  ];

  const categories = ['All', 'Product Updates', 'Technical', 'Tips & Tricks', 'Tutorials', 'Research', 'Design'];

  return (
    <div className="min-h-screen bg-background text-textPrimary">
      {/* Navigation */}
      <Navbar showHome={true} />

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-12 border-b border-highlight/50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-accent via-[#D4B87A] to-accent bg-clip-text text-transparent">
            Blog
          </h1>
          <p className="text-xl text-textSecondary mb-8">
            Insights, updates, and tips from the ProjectX team
          </p>
          
          {/* Subscribe Section */}
          <div className="bg-surface border border-highlight rounded-xl p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold mb-3">📬 Subscribe to our newsletter</h3>
            <p className="text-sm text-textSecondary mb-4">Get the latest posts delivered right to your inbox</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-2 bg-background border border-highlight rounded-lg text-textPrimary focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
              />
              <button className="px-6 py-2 bg-accent hover:bg-[#B89658] text-background font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="container mx-auto px-6 py-6 border-b border-highlight/50">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                category === 'All'
                  ? 'bg-accent text-background'
                  : 'bg-surface text-textSecondary hover:bg-highlight hover:text-accent border border-highlight'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Posts */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <span className="text-accent">⭐</span> Featured Posts
        </h2>
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {blogPosts.filter(post => post.featured).map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="group bg-surface border-2 border-highlight rounded-2xl overflow-hidden hover:border-accent transition-all hover:shadow-2xl hover:shadow-accent/10 transform hover:scale-[1.02]"
            >
              <div className="p-8">
                <div className="text-6xl mb-4">{post.image}</div>
                <div className="flex items-center gap-3 mb-4 text-sm">
                  <span className="px-3 py-1 bg-accent/20 text-accent rounded-full font-medium">
                    {post.category}
                  </span>
                  <span className="text-textSecondary">{post.readTime}</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-textPrimary group-hover:text-accent transition-colors">
                  {post.title}
                </h3>
                <p className="text-textSecondary mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-textSecondary">{post.author}</span>
                  <span className="text-textSecondary">{post.date}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* All Posts */}
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <span className="text-accent">📝</span> Recent Posts
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {blogPosts.filter(post => !post.featured).map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="group bg-surface border border-highlight rounded-xl overflow-hidden hover:border-accent transition-all hover:shadow-xl transform hover:scale-[1.02]"
            >
              <div className="p-6">
                <div className="text-4xl mb-3">{post.image}</div>
                <div className="flex items-center gap-2 mb-3 text-xs">
                  <span className="px-2 py-1 bg-highlight text-textSecondary rounded-full">
                    {post.category}
                  </span>
                  <span className="text-textSecondary">{post.readTime}</span>
                </div>
                <h3 className="text-lg font-bold mb-2 text-textPrimary group-hover:text-accent transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-textSecondary mb-3 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-textSecondary">
                  <span>{post.author}</span>
                  <span>{post.date}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-surface border-2 border-highlight hover:border-accent text-textPrimary hover:text-accent font-semibold rounded-xl transition-all hover:bg-highlight">
            Load More Posts
          </button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-12 border-t border-highlight/50">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-r from-accent/10 via-accent/5 to-accent/10 border border-accent/30 rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to boost your productivity?</h2>
          <p className="text-textSecondary mb-6">
            Join thousands of users who are already managing their time like pros
          </p>
          <Link
            href="/sign-up"
            className="inline-block bg-accent hover:bg-[#B89658] text-background font-semibold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
