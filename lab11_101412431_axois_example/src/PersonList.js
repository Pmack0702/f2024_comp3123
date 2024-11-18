import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

class PersonList extends Component {
  state = {
    persons: []
  };

  componentDidMount() {
    axios
      .get(`https://randomuser.me/api/?results=10`)
      .then((res) => {
        const persons = res.data.results;
        this.setState({ persons });
      })
      .catch((err) => console.error("Error fetching data:", err));
  }

  render() {
    return (
      <div className="container my-5">
        <h2 className="text-center text-white bg-success py-3 rounded">User List</h2>
        {this.state.persons.map((person) => (
          <div
            className="card mb-4 shadow-sm"
            style={{
              backgroundColor: "#0099cc",
              color: "white",
              border: "none",
              borderRadius: "10px"
            }}
            key={person.login.uuid}
          >
            <div className="card-body">
              <div className="d-flex align-items-center">
                {/* Image and Button Section */}
                <div
                  className="d-flex flex-column align-items-center"
                  style={{ minWidth: "150px" }}
                >
                  <img
                    src={person.picture.large}
                    alt={`${person.name.first} ${person.name.last}`}
                    className="rounded-circle"
                    style={{
                      width: "120px",
                      height: "120px",
                      border: "5px solid white",
                      marginBottom: "15px"
                    }}
                  />
                  <button className="btn btn-light text-dark">Details</button>
                </div>

                {/* User Details Section */}
                <div className="d-flex flex-column ">

                  <h5 className="mb-3">
                    {person.name.title} {person.name.first} {person.name.last} -{" "}
                    {person.login.uuid}
                  </h5>

                  <hr/>
                  <p className="mb-1">
                    <strong>User Name:</strong> {person.login.username}
                  </p>
                  <p className="mb-1">
                    <strong>Gender:</strong> {person.gender.toUpperCase()}
                  </p>
                  <p className="mb-1">
                    <strong>Time Zone Description:</strong>{" "}
                    {person.location.timezone.description}
                  </p>
                  <p className="mb-1">
                    <strong>Address:</strong> {person.location.street.number}{" "}
                    {person.location.street.name}, {person.location.city},{" "}
                    {person.location.state}, {person.location.country} -{" "}
                    {person.location.postcode}
                  </p>
                  <p className="mb-1">
                    <strong>Email:</strong> {person.email}
                  </p>
                  <p className="mb-1">
                    <strong>Birth Date and Age:</strong>{" "}
                    {new Date(person.dob.date).toLocaleDateString()} (
                    {person.dob.age} years)
                  </p>
                  <p className="mb-1">
                    <strong>Register Date:</strong>{" "}
                    {new Date(person.registered.date).toLocaleDateString()}
                  </p>
                  <p className="mb-1">
                    <strong>Phone#:</strong> {person.phone}
                  </p>
                  <p className="mb-1">
                    <strong>Cell#:</strong> {person.cell}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default PersonList;
