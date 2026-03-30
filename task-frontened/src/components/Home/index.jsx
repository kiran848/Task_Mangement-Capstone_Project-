import React from "react";
import PublicNavbar from "../Navbar/PublicNavbar";

export default function Home() {
  return (
    <>
      

      
      <div
        style={{
          height: "90vh",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
        }}
        className="d-flex flex-column justify-content-center align-items-center text-center"
      >
        <h1 className="fw-bold">Manage Tasks Efficiently</h1>
        <p className="lead">
          Track, assign and complete tasks with ease
        </p>
        <button className="btn btn-danger mt-3">Get Started</button>

        
      
      </div>

     
      <div className="container text-center mt-5">
        <div className="row">
          <div className="col-md-3">
            <h5>General</h5>
            <p>Manage daily tasks easily</p>
          </div>

          <div className="col-md-3">
            <h5>Installation</h5>
            <p>Simple setup and usage</p>
          </div>

          <div className="col-md-3">
            <h5>Options</h5>
            <p>Flexible task management</p>
          </div>

          <div className="col-md-3">
            <h5>Pages</h5>
            <p>Organized dashboard</p>
          </div>
        </div>
      </div>
    </>
  );
}