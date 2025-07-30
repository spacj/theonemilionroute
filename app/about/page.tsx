import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about our blog and our mission to share knowledge.',
}

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">About MyBlog</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-600 mb-8">
          Welcome to MyBlog, where we share insights, tutorials, and the latest trends 
          in web development, technology, and digital innovation.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
        <p className="text-gray-700 mb-6">
          Our mission is to provide high-quality, accessible content that helps developers 
          and tech enthusiasts stay up-to-date with the rapidly evolving world of technology. 
          We believe in the power of sharing knowledge and building a community of learners.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">What You'll Find Here</h2>
        <ul className="text-gray-700 mb-6 space-y-2">
          <li>• In-depth tutorials on modern web development</li>
          <li>• Best practices and coding tips</li>
          <li>• Technology reviews and comparisons</li>
          <li>• Industry insights and trends</li>
          <li>• Open source project highlights</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">Get in Touch</h2>
        <p className="text-gray-700">
          Have questions, suggestions, or want to contribute? We'd love to hear from you! 
          Reach out to us through our social media channels or contact form.
        </p>
      </div>
    </div>
  )
}