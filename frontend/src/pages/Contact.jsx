function Contact() {
  return (
    <div className="container-fluid">
      <div className="text-center mb-4">
        <h2 className="fw-bold text-success">Contact Us</h2>
        <p className="text-secondary">
          We'd love to hear from you. Reach out to us for any queries or information.
        </p>
      </div>

      <div className="row g-3">
        <div className="col-12 col-lg-5">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <h4 className="fw-bold mb-3 text-success">
                Get In Touch
              </h4>

              <div className="mb-3">
                <h6 className="fw-bold">📍 Address</h6>
                <p className="text-secondary mb-0">
                  123 GPREC Street, Kurnool City,
                  Knowledge Park, 518007
                </p>
              </div>

              <div className="mb-3">
                <h6 className="fw-bold">📞 Phone</h6>
                <p className="text-secondary mb-0">
                  +91 9876543210
                </p>
              </div>

              <div className="mb-3">
                <h6 className="fw-bold">✉️ Email</h6>
                <p className="text-secondary mb-0">
                  info@foodnest2026.com
                </p>
              </div>

              <div>
                <h6 className="fw-bold">🕒 Office Hours</h6>
                <p className="text-secondary mb-0">
                  Monday - Saturday <br />
                  9:00 AM - 6:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-7">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h4 className="fw-bold text-primary mb-3">
                Send a Message
              </h4>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email address"
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Message
                </label>
                <textarea
                  rows="4"
                  className="form-control"
                  placeholder="Write your message here..."
                ></textarea>
              </div>

              <button className="btn btn-success">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
