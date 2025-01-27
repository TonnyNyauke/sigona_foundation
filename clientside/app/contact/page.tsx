'use client'

import React, { useState, FormEvent, ChangeEvent } from 'react'
import Link from 'next/link'
import { NextPage } from 'next'
import { Phone, Mail, MapPin, Facebook } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import Header from '../Home/Header'
import Footer from '../Home/Footer'

interface ContactFormData {
  name: string
  email: string
  message: string
}

const Contact: NextPage = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Firebase submission logic will be added here
    console.log(formData)
  }

  return (
    <div className="bg-gray-50 min-h-screen">
        <Header />
      <header className="bg-green-700 text-white py-12 text-center mt-10">
        <h1 className="text-4xl font-bold">Contact Sigona Thomas Foundation</h1>
        <p className="mt-4 max-w-2xl mx-auto">
          We&apos;re here to listen, support, and collaborate. Reach out to us through any of the channels below.
        </p>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-white shadow-xl rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-green-800">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Your Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="Write your message here..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-600 transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Details */}
        <div className="space-y-8">
          {/* Google Maps Embed */}
          <div className="w-full h-80 rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.416679151602!2d34.45415629052618!3d-0.5260929202800166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19d7f3306396b0a7%3A0x4aa6578e65c9319d!2sHoma%20Bay%20Town%2C%20Kenya!5e0!3m2!1sen!2ske!4v1695676098871!5m2!1sen!2ske"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
            ></iframe>
          </div>

          {/* Contact Information */}
          <div className="bg-white shadow-xl rounded-lg p-8 space-y-6">
            <div className="flex items-center space-x-4">
              <MapPin className="text-green-700 w-6 h-6" />
              <div>
                <h3 className="font-bold text-green-800">Our Location</h3>
                <p className="text-gray-600">
                  Legacy Building, 1st Floor, Salama Street, Homa Bay, Kenya
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Phone className="text-green-700 w-6 h-6" />
              <div>
                <h3 className="font-bold text-green-800">Phone Numbers</h3>
                <p className="text-gray-600">+254 746 586 459</p>
                <p className="text-gray-600">+254 746 586 189</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Mail className="text-green-700 w-6 h-6" />
              <div>
                <h3 className="font-bold text-green-800">Email Addresses</h3>
                <Link 
                  href="mailto:info@sigonathomasfoundation.org" 
                  className="text-green-700 hover:underline"
                >
                  info@sigonathomasfoundation.org
                </Link>
                <br />
                <Link 
                  href="mailto:stfkenya2019@gmail.com" 
                  className="text-green-700 hover:underline"
                >
                  stfkenya2019@gmail.com
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex space-x-4">
                <Link 
                  href="https://www.facebook.com/SigonaThomasFoundation" 
                  className="text-green-700 hover:text-green-900 flex items-center"
                >
                  <Facebook className="mr-2" /> Facebook
                </Link>
                <Link 
                  href="https://wa.me/+254746586459" 
                  className="text-green-700 hover:text-green-900 flex items-center"
                >
                  <FaWhatsapp className="mr-2" /> WhatsApp
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Contact