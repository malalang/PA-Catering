import ContactForm from '@/lib/forms/ContactForm';
import ContactInfo from './components/ContactInfo';
import MapEmbed from './components/MapEmbed';


export default function ContactPage() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Get In Touch</h1>
        <div className="w-24 h-1 bg-yellow-500/95 mx-auto"></div>
        <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
          Have questions or feedback? We'd love to hear from you. Fill out the form below or reach out to us directly.
        </p>
      </div>

      <ContactInfo />

      <div className="mt-16">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Send Us a Message</h2>
        <ContactForm />
      </div>

      <div className="mt-16">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Find Us on the Map</h2>
        <MapEmbed />
      </div>
    </div>
  );
}

