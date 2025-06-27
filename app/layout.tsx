import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({ 
  weight: ['900'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'A₹UN $HEKHAR - AI & Data Science Portfolio',
  description: 'A₹UN $HEKHAR - IIT Jodhpur B.Sc Applied AI & Data Science student portfolio. Showcasing AI projects, handwritten notes, and coding journey.',
  keywords: ['AI', 'Data Science', 'IIT Jodhpur', 'Portfolio', 'React', 'Next.js'],
  authors: [{ name: 'A₹UN $HEKHAR' }],
  creator: 'A₹UN $HEKHAR',
  openGraph: {
    title: 'A₹UN $HEKHAR - AI & Data Science Portfolio',
    description: 'IIT Jodhpur B.Sc Applied AI & Data Science student portfolio',
    url: 'https://my-portfolio-kappa-five-34.vercel.app',
    siteName: 'A₹UN $HEKHAR Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'A₹UN $HEKHAR Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'A₹UN $HEKHAR - AI & Data Science Portfolio',
    description: 'IIT Jodhpur B.Sc Applied AI & Data Science student portfolio',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#00BCD4" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
} 