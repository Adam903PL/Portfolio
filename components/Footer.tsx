import React from 'react';
import Link from 'next/link';
import { Github, Linkedin, Mail, Twitter, ArrowUpRight, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/#about' },
    { name: 'Skills', href: '/#skills' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' },
  ];

  const socialLinks = [
    { 
      name: 'GitHub', 
      href: 'https://github.com/Adam903PL/', 
      icon: <Github className="w-5 h-5" />,
      color: 'hover:text-purple-400'
    },
    { 
      name: 'Twitter', 
      href: 'https://x.com/adam_p903', 
      icon: <Twitter className="w-5 h-5" />,
      color: 'hover:text-blue-400'
    },
    { 
      name: 'LinkedIn', 
      href: 'https://www.linkedin.com/in/adam-pukaluk-339058298/', 
      icon: <Linkedin className="w-5 h-5" />,
      color: 'hover:text-blue-500'
    },
    { 
      name: 'Email', 
      href: 'mailto:pukaluk.adam505@gmail.com', 
      icon: <Mail className="w-5 h-5" />,
      color: 'hover:text-red-400'
    },
  ];

  const quickInfo = [
    { label: 'Location', value: 'Lublin, Poland' },
    { label: 'Phone', value: '+48 695 031 104' },
    { label: 'Email', value: 'pukaluk.adam505@gmail.com' },
  ];

  return (
    <footer className="relative border-t border-white/10 bg-black overflow-hidden">
      {/* Background decoration */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-gray-800/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-gray-700/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-300 via-white to-gray-300 bg-clip-text text-transparent mb-3">
                Adam Pukaluk
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                16-year-old developer passionate about creating exceptional digital experiences. 
                Student at TechniSchools Lublin, specializing in full-stack development and modern web technologies.
              </p>
            </div>

            {/* Quick Info */}
            <div className="space-y-2">
              {quickInfo.map((info) => (
                <div key={info.label} className="flex items-start gap-2 text-sm">
                  <span className="text-gray-500 min-w-[80px]">{info.label}:</span>
                  <span className="text-gray-400">{info.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
              Navigation
            </h4>
            <nav className="flex flex-col space-y-3">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors text-sm w-fit group flex items-center gap-1"
                >
                  {link.name}
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </nav>
          </div>

          {/* Social & Connect */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
                Connect
              </h4>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2.5 rounded-lg border border-white/10 bg-white/5 text-gray-400 transition-all hover:scale-110 hover:border-white/20 ${social.color}`}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-green-500/20 bg-green-500/5">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              <span className="text-xs text-green-400 font-medium">Available for work</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {currentYear} Adam Pukaluk. All rights reserved.
          </p>
          
          <div className="flex items-center gap-1 text-gray-400 text-sm">
            <span>Built with</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
            <span>using Next.js & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;