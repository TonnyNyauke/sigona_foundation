import Link from 'next/link'
import React from 'react'

function Footer() {
  return (
    <div>
        <footer className="bg-gray-800 text-white py-8 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Sigona Thomas Foundation. All Rights Reserved.</p>
          <div className="flex justify-center gap-4 mt-4">
            <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:underline">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer