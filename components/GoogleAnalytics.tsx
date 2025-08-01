'use client'

import Script from 'next/script'

const GA_MEASUREMENT_ID = 'G-T70E5SKZ10'
const ADSENSE_CLIENT_ID = 'ca-pub-7503389769071622'

export default function GoogleAnalytics() {
  if (process.env.NODE_ENV !== 'production') {
    return null
  }

  return (
    <>
      {/* Google Analytics */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
      
      {/* Google AdSense */}
      <Script
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
    </>
  )
}