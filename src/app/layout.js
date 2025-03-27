import './globals.css'

export const metadata = {
  title: 'Web3 Voting System',
  description: 'Decentralized voting application',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}