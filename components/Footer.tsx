import Link from 'next/link'
import AdBanner from './AdBanner'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="flex items-center justify-center w-full px-4 sm:px-0 mb-6 mt-6">
        <div className="sm:w-[90vw] sm:h-[10vh] md:w-[70vw] md:h-[20vh] flex items-center justify-center overflow-hidden">
          <AdBanner adType="video-horizontal-1" className="m-0 w-full h-full" />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">OneMilionRoute.com</h3>
            <p className="text-gray-400 mb-4">
              Discover the latest articles, tutorials, and insights on financial freedom, 
              plus calculators, reviews and anything else you may need to rock .
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/calculators" className="text-gray-400 hover:text-white transition-colors">
                  Calculators
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400">
          <p>&copy; 2025 OneMilionRoute.com  All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}