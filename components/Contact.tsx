'use client';

import { useState } from 'react';
import { User, Mail, Phone, MessageSquare, Check, X } from 'lucide-react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });

  const [status, setStatus] = useState<
    'idle' | 'sending' | 'success' | 'error'
  >('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim())
      newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = 'Invalid email format';

    if (!formData.message.trim()) newErrors.message = 'Message is required';
    else if (formData.message.length < 10)
      newErrors.message = 'Message too short';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('sending');

    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Request failed');

      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          message: '',
        });
      }, 2500);
    } catch (err) {
      console.error(err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 2500);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  return (
    <main className="pt-28 pb-20 min-h-screen bg-black/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* HEADER */}
        <div className="text-center mb-12">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Contact
          </p>

          <h1
            className="mt-2 text-4xl sm:text-5xl font-bold bg-gradient-to-r 
            from-gray-300 via-white to-gray-300 bg-clip-text text-transparent"
          >
            Get in Touch
          </h1>

          <p className="mt-3 text-gray-400 max-w-xl mx-auto">
            We'd love to hear from you! Drop a message and I'll get back to you
            soon.
          </p>
        </div>

        {/* FORM CARD */}
        <div
          className="mt-12 max-w-lg mx-auto p-8 md:p-10 rounded-xl shadow-2xl
          backdrop-blur-md bg-black/50 border border-white/20 relative"
        >
          {/* STATUS MESSAGES */}
          {status === 'success' && (
            <div
              className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg 
              flex items-center gap-3 text-green-300"
            >
              <Check className="w-5 h-5" />
              <p>Your message has been sent!</p>
            </div>
          )}

          {status === 'error' && (
            <div
              className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg
              flex items-center gap-3 text-red-400"
            >
              <X className="w-5 h-5" />
              <p>Something went wrong. Please try again.</p>
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* NAME ROW */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {(['firstName', 'lastName'] as const).map((field) => (
                <div key={field}>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                    <User className="w-4 h-4 text-gray-400" />
                    {field === 'firstName' ? 'First Name' : 'Last Name'}
                  </label>

                  <input
                    type="text"
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white/5 border ${
                      errors[field] ? 'border-red-500/50' : 'border-white/10'
                    } text-white rounded-lg focus:outline-none focus:border-white/50`}
                    placeholder={field === 'firstName' ? 'Adam' : 'Pukaluk'}
                  />

                  {errors[field] && (
                    <p className="text-xs text-red-400 mt-1">{errors[field]}</p>
                  )}
                </div>
              ))}
            </div>

            {/* EMAIL */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                <Mail className="w-4 h-4 text-gray-400" />
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-white/5 border ${
                  errors.email ? 'border-red-500/50' : 'border-white/10'
                } text-white rounded-lg focus:outline-none focus:border-white/50`}
                placeholder="adam@example.com"
              />

              {errors.email && (
                <p className="text-xs text-red-400 mt-1">{errors.email}</p>
              )}
            </div>

            {/* PHONE (OPTIONAL) */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                <Phone className="w-4 h-4 text-gray-400" />
                Phone Number{' '}
                <span className="text-gray-500 text-xs">(optional)</span>
              </label>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+48 695 031 104"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 
                text-white rounded-lg focus:outline-none focus:border-white/50"
              />
            </div>

            {/* MESSAGE TEXTAREA */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                <MessageSquare className="w-4 h-4 text-gray-400" />
                Your Message
              </label>

              <textarea
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-white/5 border ${
                  errors.message ? 'border-red-500/50' : 'border-white/10'
                } text-white rounded-lg focus:outline-none focus:border-white/50`}
                placeholder="Tell me about your project or idea..."
              />

              {errors.message && (
                <p className="text-xs text-red-400 mt-1">{errors.message}</p>
              )}
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full px-6 py-4 rounded-full font-semibold 
              text-black bg-gradient-to-br from-white to-gray-300 
              hover:from-gray-100 hover:to-gray-400 transition-all shadow-lg
              flex items-center justify-center gap-2"
            >
              {status === 'sending' ? (
                <>
                  <div className="w-5 h-5 border-2 border-black/30 border-t-white rounded-full animate-spin"></div>
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
