'use client'

import { useState, useEffect } from 'react'

const CookieConsentBanner = () => {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setShowBanner(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setShowBanner(false)
    
    // Enable analytics/tracking here
    // Example: gtag('consent', 'update', { analytics_storage: 'granted' })
    console.log('Cookies accepted - analytics enabled')
  }

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined')
    setShowBanner(false)
    
    // Disable analytics/tracking
    console.log('Cookies declined - analytics disabled')
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 shadow-lg z-50 border-t border-gray-700">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm leading-relaxed">
            We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
            By clicking "Accept All", you consent to our use of cookies.{" "}
            <a 
              href="/privacy-policy" 
              className="text-blue-400 hover:text-blue-300 underline transition-colors"
            >
              Learn more
            </a>
          </p>
        </div>
        
        <div className="flex gap-3 shrink-0">
          <button
            onClick={handleDecline}
            className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white border border-gray-600 hover:border-gray-500 rounded-lg transition-colors"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  )
}

export default CookieConsentBanner