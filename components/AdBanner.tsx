interface AdBannerProps {
  size?: 'banner' | 'rectangle' | 'leaderboard'
  className?: string
}

export default function AdBanner({ size = 'banner', className = '' }: AdBannerProps) {
  const dimensions = {
    banner: 'w-full h-32',
    rectangle: 'w-80 h-64',
    leaderboard: 'w-full h-24'
  }

  return (
    <div className={`${dimensions[size]} ${className} my-8`}>
      <div className="w-full h-full bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
        <div className="text-center text-gray-500">
          <p className="text-sm font-medium">Advertisement</p>
          <p className="text-xs">Your ad content here</p>
        </div>
      </div>
    </div>
  )
}