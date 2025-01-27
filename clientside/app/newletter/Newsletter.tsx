'use client'

import { useState, FormEvent } from 'react';

interface NewsletterData {
  email: string;
  type: 'individual' | 'organization';
}

const Newsletter = () => {
  const [formData, setFormData] = useState<NewsletterData>({
    email: '',
    type: 'individual'
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Firebase submission logic will go here
    console.log(formData);
    setLoading(false);
  };

  return (
    <section className="bg-green-700 py-16 px-6">
      <div className="max-w-4xl mx-auto text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Stay Connected</h2>
        <p className="text-lg mb-8">
          Join our community of change-makers. Get updates about our impact, partnership opportunities, and ways to contribute.
        </p>
        
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg text-gray-800 focus:ring-2 focus:ring-yellow-500"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="flex-1 md:flex-initial">
              <select
                className="w-full md:w-auto px-4 py-3 rounded-lg text-gray-800 focus:ring-2 focus:ring-yellow-500"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as 'individual' | 'organization' })}
              >
                <option value="individual">Individual</option>
                <option value="organization">Organization</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-yellow-500 text-white px-8 py-3 rounded-lg hover:bg-yellow-400 transition disabled:opacity-50"
            >
              {loading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </div>
        </form>
        
        <p className="text-sm mt-4 opacity-80">
          By subscribing, you&apos;ll receive updates about our programs, impact stories, and partnership opportunities.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;