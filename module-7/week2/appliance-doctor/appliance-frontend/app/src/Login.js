import { Navbar } from "./Navbar";
import doctor from "./doctor.png";
import "./Login.css";

export const Login = () => {
  const logOn = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    const response = await fetch(`http://localhost:3001/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        email,
        password,
      },
    });

    const data = await response.json();

    if (data.error) {
      alert(data.error);
    } else if (data.success) {
      localStorage.email = email;
      localStorage.password = password;
      window.location = "/customers";
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-4"></div>
          <div className="col-4 card align-items-center">
            <img className="drImg" src={doctor} alt="doctor logo"></img>
            <form className="card-body" onSubmit={logOn}>
              <div className="mb-3 text-center">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email Address:
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3 text-center">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password:
                </label>
                <input type="password" className="form-control" id="password" />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: "100%" }}
              >
                Log In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
