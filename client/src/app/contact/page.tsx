import ContactForm from '@/lib/forms/ContactForm';
import ContactInfo from './components/ContactInfo';
import MapEmbed from './components/MapEmbed';
import Main from '@/components/ui/layout/Main';


export default function ContactPage() {
  return (
    <Main tittle="Contact Us" heading="Have questions or feedback? We'd love to hear from you. Fill out the form below or reach out to us directly.">

      <ContactInfo />

      <ContactForm />

      <MapEmbed />
    </Main>
  );
}

