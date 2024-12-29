import './EmbeddedMap.css'

const EmbeddedMap = () => {
    return (
      <div className="Map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d247.9342762236869!2d106.8695277699229!3d-6.137632473302848!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f57eecd18327%3A0xbb98a90ffb91397d!2sCity%20Motor!5e0!3m2!1sen!2sid!4v1731845846629!5m2!1sen!2sid"
          width="100%"
          height="300"
          style={{ border: 10 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Maps Embed"
        ></iframe>
      </div>
    );
  };
  
  export default EmbeddedMap;
  