const MapEmbed: React.FC = () => {
  return (
    <div className="w-full h-64 md:h-80 border border-white/50 rounded-md overflow-hidden">
  <iframe 
src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d186.1725268547972!2d31.07656385293001!3d-23.86743878213464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjPCsDUyJzAyLjciUyAzMcKwMDQnMzYuMSJF!5e1!3m2!1sen!2sza!4v1748643148484!5m2!1sen!2sza"  width="100%"
  height="100%"
  
  style={{ border: 0 }}
  referrerPolicy="no-referrer-when-downgrade"
  allowFullScreen
        aria-hidden="false"
      ></iframe>
      </div>
  );
};

export default MapEmbed;
