import "./Sidebar.css";
import doctor from "./doctor.png";

export const Sidebar = () => {
  return (
    <div
      style={{
        height: "calc(100vh - 50px)",
        backgroundColor: "white",
        padding: 15,
      }}
    >
      <ul className="list-group text-center">
        <li className="li-img">
          <img className="drImg" src={doctor} alt="doctor logo"></img>
        </li>
        <li
          className="list-group-item"
          onClick={() => {
            window.location = "/customers";
          }}
        >
          Customers
        </li>
        <li
          className="list-group-item"
          onClick={() => {
            window.location = "/appliances";
          }}
        >
          Appliances
        </li>
        <li className="list-group-item">Service Orders</li>
        <li className="list-group-item">Tech Assignment</li>
        <li className="list-group-item">Manage Users</li>
        <li className="list-group-item">Reports</li>
        <li className="list-group-item">Parts</li>
        <li
          className="list-group-item"
          onClick={() => {
            delete localStorage.password;
            delete localStorage.email;
            window.location = "/";
          }}
        >
          Log Out
        </li>
      </ul>
    </div>
  );
};
