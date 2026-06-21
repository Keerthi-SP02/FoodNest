import aboutImg from "../assets/about.png";
function About() {
  return (
    <div className="container-fluid py-2 px-3">
      <div className="row align-items-center g-3 mb-2">
        <div className="col-lg-5 col-md-6 text-center">
          <img
          src={aboutImg}
            alt="Food Management"
            className="img-fluid rounded shadow"
            style={{
              maxHeight: "260px",
              width: "100%",
              objectFit: "cover",
            }}
          />
        </div>

        <div className="col-lg-7 col-md-6">
          <h4 className="text-success fw-bold mb-2">
            How FoodNest Born?
          </h4>

          <p className="text-secondary mb-0">
            ❤️ Once upon a time, Tom the Tomato and Pota the Potato lived in the
            same kitchen but never met because everything was messy and
            unorganized. Just when they thought they might expire before meeting,
            FoodNest came to the rescue! By tracking inventory and expiry dates,
            it brought them together. Tom smiled, “I think we'd make a great
            curry together,” and Pota replied, “I've been starch-ing my heart
            for you all along.” They lived happily ever after... although the
            milk carton missed the wedding because it had already expired! 😂🥛
          </p>
        </div>
      </div>

     <div className="row justify-content-center g-3 mb-3">
  <div className="col-lg-4 col-md-6">
    <div className="card border-0 shadow-sm">
      <div className="card-body text-center py-2">
        <h6 className="text-info fw-bold mb-1">
          Inventory Management
        </h6>
        <p className="small mb-0">
          Add, update and manage food stock easily.
        </p>
      </div>
    </div>
  </div>

  <div className="col-lg-4 col-md-6">
    <div className="card border-0 shadow-sm">
      <div className="card-body text-center py-2">
        <h6 className="text-info fw-bold mb-1">
          Expiry Tracking
        </h6>
        <p className="small mb-0">
          Monitor expiry dates and reduce waste.
        </p>
      </div>
    </div>
  </div>

  <div className="col-lg-4 col-md-6">
    <div className="card border-0 shadow-sm">
      <div className="card-body text-center py-2">
        <h6 className="text-info fw-bold mb-1">
        Smart Dashboard
        </h6>
        <p className="small mb-0">
          View stock insights in real time.
        </p>
      </div>
    </div>
  </div>
</div>

      <div className="row justify-content-center">
        <div className="col-lg-7 col-md-9">
          <div className="card border-0 shadow-sm bg-light">
            <div className="card-body text-center py-3">
              <h5 className="text-primary fw-bold mb-2">
                Our Mission
              </h5>

              <p className="small text-secondary mb-0 p-4">
                To help people manage food efficiently, reduce wastage,
                save money, and promote smarter consumption through
                simple digital tracking.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;