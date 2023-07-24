import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'home-page',
  styleUrl: 'home-page.css',
})
export class HomePage {
  @State() userData: any = {};

  componentWillLoad() {
    // Retrieve the user data from local storage
    const loggedInUser = sessionStorage.getItem('username');

    if (loggedInUser) {
      this.userData = JSON.parse(loggedInUser);
    } else {
      // User is not logged in, redirect to the login page
      window.location.href = '/';
    }
  }

  render() {
    return (
      <body>
      <div>
        <header class="header">
          <div class="left4">
            {/* <img src="/Pics/vans-5630777.png" alt="" /> */}
            <div>CMS</div>
          </div>
          <div class="mid4">
            <ul class="navbar4">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="/tracking-page">Tracking</a>
              </li>
              <li>
                <a href="/profile">Profile</a>
              </li>
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
                <a href="/pricing">Pricing</a>
              </li>
            </ul>
          </div>
          <div class="right4">
            <button class="btn">Contact</button>
            <button class="btn" onClick={() => this.logoutUser()}>Logout</button>
          </div>
        </header>
        <div class="contain4">
          <h1>Delivering happiness and needs</h1>
          <div id="userData">
            <h2>Welcome, {sessionStorage.username}!</h2>
            {/* Display other user data as needed */}
          </div>
        </div>
      </div>
      </body>
    );
  }

  toggleDropdown() {
    const dropdown = document.querySelector('.dropdown');
    dropdown.classList.toggle('active');
  }

  logoutUser() {
    // Clear the user data from local storage
    sessionStorage.clear();

    // Redirect to the login page
    window.location.href = '/';
  }
}
