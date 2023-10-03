import React from "react";

const Home = () => {
  return (
    <div>
      <center>
        <div className="input-container">
          <form>
            <label htmlFor="fname">Username : </label>
            <input type="text" name="username" id="username" />
            <br /><br />
            <label htmlFor="email">Email : </label>
            <input type="email" />
            <br /><br />
            <label htmlFor="password">Password : </label>
            <input type="text" /><br /><br />
            <label htmlFor="age">Age : </label>
            <input type="number" />
            <label htmlFor="address">Address : </label>
            <input type="text" />
          </form>
            <br />
            <br />
        </div>
      </center>
    </div>
  );
};

export default Home;
