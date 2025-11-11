import ContactForm from '@/components/ContactForm';
import React from 'react';
import { FaMapMarkerAlt, FaClock, FaEnvelope, FaPhone } from 'react-icons/fa';
// import dynamic from 'next/dynamic';

// Dynamically import the ContactForm component to avoid SSR issues with form libraries
// const ContactForm = dynamic(() => import('@/components/ContactForm'), {
//   ssr: false,
// });

const MapEmbed = () => (
  <div className="w-full h-96 rounded-lg overflow-hidden mt-8">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.3059669869!2d-74.25986773715416!3d40.69767006372085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1234567890"
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className="rounded-lg"
    />
  </div>
);

const ContactInfo = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
    <div className="flex items-start space-x-4 p-4 bg-white/5 rounded-lg">
      <div className="p-2 bg-red-500/10 rounded-full">
        <FaMapMarkerAlt className="text-red-500/95 text-xl" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-white mb-1">Our Location</h3>
        <p className="text-gray-300">123 Restaurant Street, Foodie City, FC 12345</p>
      </div>
    </div>
    
    <div className="flex items-start space-x-4 p-4 bg-white/5 rounded-lg">
      <div className="p-2 bg-red-500/10 rounded-full">
        <FaPhone className="text-red-500/95 text-xl" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-white mb-1">Phone</h3>
        <p className="text-gray-300">+1 (555) 123-4567</p>
      </div>
    </div>
    
    <div className="flex items-start space-x-4 p-4 bg-white/5 rounded-lg">
      <div className="p-2 bg-red-500/10 rounded-full">
        <FaEnvelope className="text-red-500/95 text-xl" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-white mb-1">Email</h3>
        <p className="text-gray-300">info@centraleatery.com</p>
      </div>
    </div>
    
    <div className="flex items-start space-x-4 p-4 bg-white/5 rounded-lg">
      <div className="p-2 bg-red-500/10 rounded-full">
        <FaClock className="text-red-500/95 text-xl" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-white mb-1">Opening Hours</h3>
        <p className="text-gray-300">Mon - Fri: 11:00 AM - 10:00 PM</p>
        <p className="text-gray-300">Sat - Sun: 10:00 AM - 11:00 PM</p>
      </div>
    </div>
  </div>
);

export default function ContactPage() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Get In Touch</h1>
        <div className="w-24 h-1 bg-red-500/95 mx-auto"></div>
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

