import ContactInfo from '@/features/contact/components/ContactInfo';
import MapEmbed from '@/features/contact/components/MapEmbed';

export default function ContactPage() {
  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <ContactInfo />
      <div className="mt-6">
        <MapEmbed />
      </div>
    </main>
  );
}
