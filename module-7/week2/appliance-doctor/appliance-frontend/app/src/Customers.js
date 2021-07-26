import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faPen, faInfo, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

export const Customers = () => {
  const [customers, setCustomers] = useState(null);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `http://localhost:3001/customers/${currentPage}`,
        {
          method: "GET",
          headers: {
            email: localStorage.email,
            password: localStorage.password,
          },
        }
      );
      const data = await response.json();
      setTotalPages(Math.ceil(data.customers.count / 5));
      setCustomers(data.customers.rows);
    })();
  }, [currentPage]);

  const createCustomer = async (event) => {
    event.preventDefault();

    let formData = {};

    for (const formField of event.target) {
      if (formField.id) {
        formData[formField.id] = formField.value;
      }
    }

    if (formData.zipCode.length < 5) {
      alert("Zip code must be a minimum of 5 characters.");
    } else if (formData.phoneNumber.length < 10) {
      alert("Phone number must be a minimum of 10 characters.");
    } else {
      const response = await fetch(`http://localhost:3001/customers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          email: localStorage.email,
          password: localStorage.password,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setCustomers(data.customers);

      for (const formField of event.target) {
        formField.value = "";
      }
    }
  };

  const searchCustomers = async (event) => {
    event.preventDefault();
    const response = await fetch(`http://localhost:3001/customerSearch`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ searchQuery: search }),
    });
    const data = await response.json();
    setCustomers(data.customers);
  };

  let paginationList = [];
  if (totalPages) {
    for (let i = 1; i <= totalPages; i++) {
      paginationList.push(
        <li
          className={`page-item ${currentPage === i ? "active" : ""}`}
          key={i}
          onClick={() => {
            setCurrentPage(i);
          }}
        >
          <span className="page-link">{i}</span>
        </li>
      );
    }
  }
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
                Customers
              </h3>
            </div>
            <form
              className="row"
              style={{
                marginTop: 20,
                marginBottom: 10,
              }}
              onSubmit={searchCustomers}
            >
              <div className="col-10">
                <input
                  type="text"
                  onChange={(evt) => {
                    setSearch(evt.target.value);
                  }}
                  value={search}
                  className="form-control"
                  placeholder="Search By Name"
                  style={{
                    boxShadow:
                      "rgba(0, 0, 0, 0.2) 0px 8px 8px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px,rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset",
                  }}
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
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Address</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers ? (
                  customers.map((customer) => {
                    return (
                      <tr key={customer.customerID}>
                        <td>{customer.firstname}</td>
                        <td>{customer.lastName}</td>
                        <td>{customer.phoneNumber}</td>
                        <td>
                          {customer.address1}
                          {customer.address2
                            ? `, ${customer.address2}`
                            : ""}, {customer.city}, {customer.state}{" "}
                          {customer.zipCode}
                        </td>
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
            {totalPages < 2 ? null : (
              <nav aria-label="Page navigation">
                <ul className="pagination">
                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                  >
                    <span
                      className="page-link"
                      onClick={() => {
                        setCurrentPage(currentPage - 1);
                      }}
                    >
                      Previous
                    </span>
                  </li>
                  {paginationList}
                  <li
                    className={`page-item ${
                      currentPage === totalPages ? "disabled" : ""
                    }`}
                  >
                    <span
                      className="page-link"
                      onClick={() => {
                        setCurrentPage(currentPage + 1);
                      }}
                    >
                      Next
                    </span>
                  </li>
                </ul>
              </nav>
            )}
            <form
              onSubmit={createCustomer}
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
                  Create New Customer
                </h4>
              </div>
              <div className="row" style={{ marginTop: "25px" }}>
                <div className="col">
                  <div className="mb-3">
                    <label htmlFor="firstname" className="form-label">
                      <small>First Name:</small>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstname"
                      required
                      onBlur={(event) => {
                        const firstName = event.target.value.trim();
                        if (firstName.length >= 1) {
                          event.target.value = `${
                            firstName.charAt(0).toUpperCase() +
                            firstName.slice(1)
                          }`;
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">
                      <small>Last Name:</small>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      required
                      onBlur={(event) => {
                        const lastName = event.target.value.trim();
                        if (lastName.length >= 1) {
                          event.target.value = `${
                            lastName.charAt(0).toUpperCase() + lastName.slice(1)
                          }`;
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <label htmlFor="address1" className="form-label">
                      <small>Address 1:</small>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address1"
                      required
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="mb-3">
                    <label htmlFor="address2" className="form-label">
                      <small>Address 2:</small>
                    </label>
                    <input type="text" className="form-control" id="address2" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-3">
                  <div className="mb-3">
                    <label htmlFor="phoneNumber" className="form-label">
                      <small>Phone Number:</small>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="phoneNumber"
                      required
                      onBlur={(event) => {
                        const number = event.target.value.trim();
                        if (number.length === 10) {
                          event.target.value = `(${number.substring(
                            0,
                            3
                          )}) ${number.substring(3, 6)}-${number.substring(6)}`;
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="col-3">
                  <div className="mb-3">
                    <label htmlFor="city" className="form-label">
                      <small>City:</small>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="city"
                      required
                      onBlur={(event) => {
                        const city = event.target.value.trim();
                        if (city.length >= 1) {
                          event.target.value = `${
                            city.charAt(0).toUpperCase() + city.slice(1)
                          }`;
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="col-3">
                  <div className="mb-3">
                    <label htmlFor="state" className="form-label">
                      <small>State:</small>
                    </label>
                    <select
                      className="form-select"
                      defaultValue="NY"
                      id="state"
                      required
                    >
                      <option></option>
                      <option>AL</option>
                      <option>AK</option>
                      <option>AZ</option>
                      <option>AR</option>
                      <option>CA</option>
                      <option>CO</option>
                      <option>CT</option>
                      <option>DE</option>
                      <option>FL</option>
                      <option>GA</option>
                      <option>HI</option>
                      <option>ID</option>
                      <option>IL</option>
                      <option>IN</option>
                      <option>IA</option>
                      <option>KS</option>
                      <option>KY</option>
                      <option>LA</option>
                      <option>ME</option>
                      <option>MD</option>
                      <option>MA</option>
                      <option>MI</option>
                      <option>MN</option>
                      <option>MS</option>
                      <option>MO</option>
                      <option>MT</option>
                      <option>NE</option>
                      <option>NV</option>
                      <option>NH</option>
                      <option>NJ</option>
                      <option>NM</option>
                      <option>NY</option>
                      <option>NC</option>
                      <option>ND</option>
                      <option>OH</option>
                      <option>OK</option>
                      <option>OR</option>
                      <option>PA</option>
                      <option>RI</option>
                      <option>SC</option>
                      <option>SD</option>
                      <option>TN</option>
                      <option>TX</option>
                      <option>UT</option>
                      <option>VT</option>
                      <option>VA</option>
                      <option>WA</option>
                      <option>WV</option>
                      <option>WI</option>
                      <option>WY</option>
                    </select>
                  </div>
                </div>
                <div className="col">
                  <div className="mb-3">
                    <label htmlFor="zipCode" className="form-label">
                      <small>Zip Code:</small>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="zipCode"
                      required
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
