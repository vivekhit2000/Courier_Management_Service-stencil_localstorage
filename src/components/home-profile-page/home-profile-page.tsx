import { Component, h } from '@stencil/core';

@Component({
  tag: 'home-profile-page',
  styleUrl: 'home-profile-page.css',
})
export class HomeProfilePage {
  toggleDropdown() {
    const dropdown = document.querySelector('.dropdown');
    dropdown.classList.toggle('active');
  }

  logoutUser() { 
    // Clear the user data from local storage
    localStorage.removeItem('loggedInUser');

    // Redirect to the login page
    window.location.href = '/';
  }

  render() {
    // Retrieve the username from session storage
    const username = sessionStorage.getItem('username');

    // Retrieve the user data from local storage based on the username
    const storedUsers = JSON.parse(localStorage.getItem('users'));
    const userData = storedUsers.find(user => user.username === username) || {};

    return (
      <div>
        <header class="header">
          <div class="left4">
            {/* Left box for logo */}
            {/* <img src="/Pics/vans-5630777.png" alt="" /> */}
            <div>CMS</div>
          </div>
          <div class="mid4">
            <ul class="navbar4">
              <li>
                <a href='/tracking-page'>Tracking</a>
              </li>
              <li>
                <a href='/profile'>Profile</a>
              </li>
              {/* Add additional navigation items as needed */}
              <li class="dropdown">
                <a class="dropdown-btn" href="#" onClick={() => this.toggleDropdown()}>
                  Shipments
                </a>
                <div id="shipmentsDropdown" class="dropdown-content">
                  <a href="/create-shipment">Create Shipment</a>
                  <a href="myshipment.html">My Shipments</a>
                </div>
              </li>
              <li>
                { <a href='/pricing'>Pricing</a> }
              </li>
            </ul>
          </div>
          <div class="right4">
            <button class="btn">Contact</button>
            <button class="btn" onClick={() => this.logoutUser()}>Logout</button>
          </div>
        </header>

        <div class="container">
          <div id="userData">
            <h2>Welcome, {userData.username ? userData.username : ''}!</h2>
            {userData.email && <p>Email: {userData.email}</p>}
            {userData.dob && <p>DOB: {userData.dob}</p>}
            {userData.phone && <p>Phone: {userData.phone}</p>}
          </div>
          <div class="home-button"> 
            <a href="/home">Home</a>
          </div>
        </div>
      </div>
    );
  }
}
