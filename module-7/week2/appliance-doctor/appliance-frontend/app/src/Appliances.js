import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faPen, faInfo, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

export const Appliances = () => {
  const [appliances, setAppliances] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:3001/appliances`, {
        method: "GET",
        headers: {
          email: localStorage.email,
          password: localStorage.password,
        },
      });
      const data = await response.json();
      setAppliances(data.appliances);
    })();
  }, []);

  const createAppliance = async (event) => {
    event.preventDefault();

    let formData = {};

    for (const formField of event.target) {
      if (formField.id) {
        formData[formField.id] = formField.value;
      }
    }
    const response = await fetch(`http://localhost:3001/appliances`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        email: localStorage.email,
        password: localStorage.password,
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    setAppliances(data.appliances);

    for (const formField of event.target) {
      formField.value = "";
    }
  };

  //   const deleteAppliance = async (event) => {
  //     event.preventDefault();
  //     if (window.confirm("Are you sure you want to delete this appliance?")) {
  //       const response = await fetch(
  //         `http://localhost:3001/appliances/${}`,
  //         {
  //           method: "DELETE",
  //         }
  //       );
  //       const data = await response.json();
  //       setAppliances(data.appliances);
  //     }
  //   };

  const searchAppliances = async (event) => {
    event.preventDefault();
    const response = await fetch(`http://localhost:3001/applianceSearch`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ searchQuery: search }),
    });
    const data = await response.json();
    setAppliances(data.appliances);
  };

  return (
    <div>
      <Navbar />
      <div className="container-fluid" style={{ marginTop: "20px" }}>
        <div className="row">
          <div className="col-3" style={{ paddingLeft: 0 }}>
            <Sidebar />
          </div>
          <div className="col-9" style={{ marginTop: "15px" }}>
            <div style={{ textAlign: "center" }}>
              <h3 style={{ textDecoration: "underline", fontWeight: 700 }}>
                Appliances
              </h3>
            </div>
            <form
              className="row"
              style={{
                marginTop: 20,
                marginBottom: 10,
              }}
              onSubmit={searchAppliances}
            >
              <div className="col-10">
                <input
                  type="text"
                  onChange={(evt) => {
                    setSearch(evt.target.value);
                  }}
                  style={{
                    boxShadow:
                      "rgba(0, 0, 0, 0.2) 0px 8px 8px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px,rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset",
                  }}
                  value={search}
                  className="form-control"
                  placeholder="Search By Make or Model"
                />
              </div>
              <div className="col-2">
                <button
                  className="btn btn-primary"
                  type="submit"
                  style={{
                    boxShadow:
                      "rgba(0, 0, 0, 0.2) 0px 8px 8px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px,rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset",
                  }}
                >
                  Search
                </button>
              </div>
            </form>
            <table
              className="table table-striped table-hover"
              style={{
                border: "1px solid lightgray",
                marginTop: "25px",
                boxShadow:
                  "rgba(0, 0, 0, 0.2) 0px 8px 8px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px,rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset",
              }}
            >
              <thead>
                <tr>
                  <th scope="col">Make</th>
                  <th scope="col">Model</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {appliances ? (
                  appliances.map((appliance) => {
                    return (
                      <tr key={appliance.applianceID}>
                        <td>{appliance.make}</td>
                        <td>{appliance.model}</td>
                        <td style={{ padding: "10px" }}>
                          <Icon
                            style={{ width: "10px", margin: "5px" }}
                            className="infoIcon"
                            icon={faInfo}
                          />
                          <Icon
                            style={{ width: "15px", margin: "5px" }}
                            className="penIcon"
                            icon={faPen}
                          />
                          <Icon
                            style={{ width: "15px", margin: "5px" }}
                            className="trashIcon"
                            icon={faTrash}
                            // onClick={deleteAppliance}
                          />
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td>Loading...</td>
                  </tr>
                )}
              </tbody>
            </table>

            <form
              onSubmit={createAppliance}
              style={{
                border: "1px solid lightgray",
                padding: "25px",
                marginTop: "20px",
                marginBottom: "20px",
                boxShadow:
                  "rgba(0, 0, 0, 0.2) 0px 8px 8px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px,rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <h4 style={{ textDecoration: "underline" }}>
                  Create New Appliance
                </h4>
              </div>
              <div className="row" style={{ marginTop: "25px" }}>
                <div className="col">
                  <div className="mb-3">
                    <label htmlFor="make" className="form-label">
                      <small>Make:</small>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="make"
                      required
                      onBlur={(event) => {
                        const make = event.target.value.trim();
                        if (make.length >= 1) {
                          event.target.value = `${
                            make.charAt(0).toUpperCase() + make.slice(1)
                          }`;
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="mb-3">
                    <label htmlFor="model" className="form-label">
                      <small>Model:</small>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="model"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <label htmlFor="notes" className="form-label">
                      <small>Notes:</small>
                    </label>
                    <input
                      type="textArea"
                      className="form-control"
                      id="notes"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col text-center">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: "33%", marginTop: "10px" }}
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
