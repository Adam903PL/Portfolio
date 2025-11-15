import { Tailwind } from '@react-email/tailwind';
import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Hr,
  Section,
} from '@react-email/components';

interface EmailTemplateProps {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message: string;
}

export function EmailTemplate({
  firstName,
  lastName,
  email,
  phone,
  message,
}: EmailTemplateProps) {
  return (
    <Html>
      <Head />

      <Tailwind>
        <Body className="bg-[#0a0a0a] font-sans antialiased">
          <Container className="mx-auto max-w-lg px-4 py-8">
            {/* Główna karta */}
            <Section className="rounded-2xl border border-white/10 bg-[#1f1f1f]/90 p-8 shadow-lg">
              {/* Logo */}
              <div className="flex justify-center mb-6">
                <svg width="48" height="48" viewBox="0 0 40 40">
                  <defs>
                    <linearGradient
                      id="waveGrad"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#fff" stopOpacity="0.6" />
                      <stop offset="50%" stopColor="#fff" />
                      <stop offset="100%" stopColor="#fff" stopOpacity="0.6" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M8 18 Q20 22, 32 18"
                    fill="none"
                    stroke="url(#waveGrad)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <path
                    d="M8 26 Q20 22, 32 26"
                    fill="none"
                    stroke="url(#waveGrad)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* Tytuł */}
              <Text className="text-center text-2xl font-bold text-white mb-1">
                New Message Received
              </Text>
              <Text className="text-center text-sm text-gray-400 mb-8">
                from{' '}
                <span className="text-white font-medium">
                  {firstName} {lastName}
                </span>
              </Text>

              <Hr className="border-white/10 mb-6" />

              {/* Dane kontaktowe */}
              <div className="space-y-3 text-sm">
                {/* Email */}
                <div className="flex items-start">
                  <span className="w-20 text-gray-400">Email:</span>
                  <a
                    href={`mailto:${email}`}
                    className="text-white underline"
                    style={{ textDecorationColor: 'rgba(255,255,255,0.3)' }}
                  >
                    {email}
                  </a>
                </div>

                {/* Phone */}
                {phone && (
                  <div className="flex items-start">
                    <span className="w-20 text-gray-400">Phone:</span>
                    <a href={`tel:${phone}`} className="text-white">
                      {phone}
                    </a>
                  </div>
                )}
              </div>

              <Hr className="border-white/10 my-6" />

              {/* Wiadomość */}
              <div>
                <Text className="text-sm font-semibold text-gray-300 mb-2">
                  Message:
                </Text>

                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <Text className="text-sm text-gray-200 whitespace-pre-wrap leading-relaxed">
                    {message}
                  </Text>
                </div>
              </div>

              {/* Stopka */}
              <div className="mt-8 text-center text-xs text-gray-500">
                <Text>
                  Sent via{' '}
                  <span className="text-white font-medium">
                    adam-pukaluk.pl
                  </span>
                </Text>

                <Text className="mt-1">
                  {new Date().toLocaleDateString('pl-PL', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
              </div>
            </Section>

            {/* Badge */}
            <div className="text-center mt-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 text-xs rounded-full border border-white/20 bg-white/5 text-gray-400">
                Open to work
                <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
              </span>
            </div>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export default EmailTemplate;
