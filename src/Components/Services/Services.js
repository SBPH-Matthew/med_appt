import "./Services.css";

const services = [
  {
    title: "Instant Consultation",
    img: "https://images.pexels.com/photos/3825529/pexels-photo-3825529.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    title: "Book an Appointment",
    img: "https://images.pexels.com/photos/6823561/pexels-photo-6823561.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    title: "Self Checkup",
    img: "https://images.pexels.com/photos/3825528/pexels-photo-3825528.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    title: "Health Tips and Guidance",
    img: "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

export default function Services() {
  return (
    <section className="services">
      <h2 className="services-title">Best Services</h2>
      <p className="services-subtitle">
        Take care of your body. It's the only place you have to live.
      </p>

      <div className="services-grid">
        {services.map((service, index) => (
          <div
            key={index}
            className={`service-card`}
          >
            <img src={service.img} alt={service.title} className="service-image" />
            <h3 className="service-name">{service.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
