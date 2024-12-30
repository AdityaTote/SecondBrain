import Script from 'next/script'

interface BrainLayoutProps{
    children: React.ReactNode;
}

export default function BrainLayout({children}: BrainLayoutProps) {
  return (
    <>
      <Script 
        src="https://platform.twitter.com/widgets.js" 
        strategy="lazyOnload"
      />
    {children}
    </>
  )
}