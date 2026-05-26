import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  serverExternalPackages: ['sharp'],
  devIndicators: {
    position: 'bottom-right',
  },
  images: {
    unoptimized: true,
  },
}

export default withPayload(nextConfig)
