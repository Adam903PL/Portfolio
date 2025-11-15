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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Request failed');
      }

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
      }, 3000);
    } catch (err) {
      console.error(err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
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
    <>
      <main className="pt-28 pb-20 bg-black/50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Nagłówek */}
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Contact
            </p>
            <h1 className="mt-2 text-4xl sm:text-5xl font-bold bg-gradient-to-r from-gray-300 via-white to-gray-300 bg-clip-text text-transparent">
              Get in Touch
            </h1>
            <p className="mt-3 text-gray-400 max-w-xl mx-auto">
              We'd love to hear from you! Drop a message and I'll get back to
              you soon.
            </p>
          </div>

          {/* Karta formularza – Frosted Glass + Glow */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-white/20 rounded-2xl blur-xl opacity-40 group-hover:opacity-60 group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative backdrop-blur-md bg-[#1f1f1f57] border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl">
              {/* Powiadomienia */}
              {status === 'success' && (
                <div className="mb-6 p-4 bg-white/5 border border-white/10 rounded-lg flex items-center gap-3 text-white animate-fade-in">
                  <Check className="w-5 h-5" />
                  <p>Thank you! Your message has been sent.</p>
                </div>
              )}
              {status === 'error' && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-400 animate-fade-in">
                  <X className="w-5 h-5" />
                  <p>Something went wrong. Please try again.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Imię i Nazwisko */}
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
                        required
                        className={`w-full px-4 py-3 bg-white/5 border ${
                          errors[field]
                            ? 'border-red-500/50'
                            : 'border-white/10'
                        } text-white rounded-lg focus:outline-none focus:border-white/50 focus:bg-white/10 transition-all duration-200 placeholder:text-gray-500`}
                        placeholder={field === 'firstName' ? 'Adam' : 'Pukaluk'}
                      />
                      {errors[field] && (
                        <p className="mt-1 text-xs text-red-400">
                          {errors[field]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Email */}
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
                    required
                    className={`w-full px-4 py-3 bg-white/5 border ${
                      errors.email ? 'border-red-500/50' : 'border-white/10'
                    } text-white rounded-lg focus:outline-none focus:border-white/50 focus:bg-white/10 transition-all duration-200 placeholder:text-gray-500`}
                    placeholder="adam@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                  )}
                </div>

                {/* Telefon – OPCJONALNY */}
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
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white rounded-lg focus:outline-none focus:border-white/50 focus:bg-white/10 transition-all duration-200 placeholder:text-gray-500 [appearance:textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-inner-spin-button]:m-0"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-400">{errors.phone}</p>
                  )}
                </div>

                {/* Wiadomość */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                    <MessageSquare className="w-4 h-4 text-gray-400" />
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className={`w-full px-4 py-3 bg-white/5 border ${
                      errors.message ? 'border-red-500/50' : 'border-white/10'
                    } text-white rounded-lg focus:outline-none focus:border-white/50 focus:bg-white/10 transition-all duration-200 placeholder:text-gray-500 resize-none`}
                    placeholder="Tell me about your project or idea..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Przycisk – taki sam jak w Navbar */}
                <div className="relative group w-full">
                  <div className="absolute inset-0 -m-1 rounded-full bg-white opacity-10 blur-md pointer-events-none transition-all duration-300 group-hover:opacity-20 group-hover:blur-lg group-hover:-m-1.5"></div>
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="relative z-10 w-full px-6 py-4 text-black bg-gradient-to-br from-white to-gray-300 rounded-full font-semibold hover:from-gray-100 hover:to-gray-400 transition-all duration-200 shadow-lg flex items-center justify-center gap-2"
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
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }
      `}</style>
    </>
  );
}
