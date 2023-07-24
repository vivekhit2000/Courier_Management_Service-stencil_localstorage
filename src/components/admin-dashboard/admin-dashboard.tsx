import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'admin-dashboard',
  styleUrl: 'admin-dashboard.css',
  shadow: false
})
export class AdminDashboard {
  @State() welcomeMessage: string;
  @State() users: { username: string; email: string }[] = [];
  @State() partnerName: HTMLInputElement;
  @State() trackingNumber: HTMLInputElement;
  @State() trackingNumbers: HTMLInputElement;

  componentDidLoad() {
    // Retrieve welcome message from local storage
    const welcomeMessage = localStorage.getItem('welcomeMessage');
    if (welcomeMessage) {
      this.welcomeMessage = welcomeMessage;
    } else {
      // Redirect to login page if welcome message not found
      window.location.href = '/admin-login';
    }

    // Retrieve user data from local storage
    const usersData = localStorage.getItem('users');
    if (usersData) {
      this.users = JSON.parse(usersData);
    }
  }

  generateTrackingId() {
    // Generate a random alphanumeric string as the tracking ID
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let trackingId = '';
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      trackingId += characters.charAt(randomIndex);
    }
    return trackingId;
  }

  toggleDropdown(elementId: string) {
    const dropdown = document.getElementById(elementId);
    if (dropdown) {
      dropdown.classList.toggle('show');
    }
  }

  assignDeliveryPartner(event: Event) {
    event.preventDefault();
    localStorage.setItem('partnerName', JSON.stringify(this.partnerName));
    localStorage.setItem('trackingNumberDP', JSON.stringify(this.trackingNumber));

    // Retrieve shipments data from local storage
    const shipmentsData = localStorage.getItem('shipments');
    if (shipmentsData) {
      const shipmentss = JSON.parse(shipmentsData);
      for(let shipment of shipmentss){
        if(shipment.trackingId==this.trackingNumber.value){
          shipment.partnerName = this.partnerName.value;
          localStorage.setItem('shipments', JSON.stringify(shipmentss));
          alert('Delivery partner assigned successfully!');
          break;
        }
      } 
    } 
  }

  updateStatus(event: Event) {
    event.preventDefault();
  
    // Retrieve shipments data from local storage
    const shipmentsData = localStorage.getItem('shipments');
    if (shipmentsData) {
      const shipments = JSON.parse(shipmentsData);
  
      let found = false;
  
      for (let shipmentToUpdate of shipments) {
        if (shipmentToUpdate.trackingId == this.trackingNumbers.value) {
          shipmentToUpdate.status = event.target['newStatus'].value;
          if (shipmentToUpdate.status === 'Shipped') {
            const newTrackId = this.generateTrackingId();
            shipmentToUpdate.trackId = newTrackId;
          } 
          found = true;
          break;
        }
      }
  
      if (found) {
        localStorage.setItem('shipments', JSON.stringify(shipments));
        alert('Shipment status updated successfully!');
      } else {
        alert("Shipment not found");
      }
    } else {
      alert('No shipments available!');
    }
  }

  render() {
    return (
      <body>
      <div class="container">
        <h1 id="welcome-message">{this.welcomeMessage}</h1>
        <div class="card">
          <h2 onClick={() => this.toggleDropdown('shipments-dropdown')}>Shipments &#9662;</h2>
          <ul id="shipments-dropdown" class="dropdown-content">
            <li>
              <a href="/view-shipment-page">View Shipments</a>
            </li>
          </ul>
        </div>
        <div class="card">
          <h2 onClick={() => this.toggleDropdown('users-dropdown')}>Users &#9662;</h2>
          <ul id="users-dropdown" class="dropdown-content">
            {this.users.map((user) => (
              <li>{`${user.username} - ${user.email}`}</li>
            ))}
          </ul>
        </div>
        <div class="card">
          <h2 onClick={() => this.toggleDropdown('update-shipment-status-dropdown')}>
            Update Shipment Status &#9662;
          </h2>
          <ul id="update-shipment-status-dropdown" class="dropdown-content">
            <div id="shipment-status-form">
              <form onSubmit={(event) => this.updateStatus(event)}>
                <label htmlFor="trackingNumbers">Tracking Number:</label>
                <input
                type="text"
                id="trackingNumbers"
                placeholder="Enter tracking number"
                required
                ref={el => (this.trackingNumbers = el)} />

                <label htmlFor="newStatus">New Status:</label>
                <select id="newStatus" required>
                  <option value="In Transit">In Transit</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out of Delivery">Out of Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
                <button type="submit">Update Status</button>
              </form>
            </div>
          </ul>
        </div>
        <div class="card">
          <h2 onClick={() => this.toggleDropdown('delivery-partner-dropdown')}>Delivery Partner &#9662;</h2>
          <ul id="delivery-partner-dropdown" class="dropdown-content">
            <div id="assign-delivery-partner-form">
              <form onSubmit={this.assignDeliveryPartner.bind(this)}>
                <label htmlFor="partnerName">Delivery Partner</label>
                <input
                  type="text"
                  id="partnerName"
                  placeholder="Enter partner name"
                  required
                  ref={el => (this.partnerName = el)}
                />
                <label htmlFor="trackingNumberDP">Tracking Number:</label>
                <input
                  type="text"
                  id="trackingNumberDP"
                  placeholder="Enter tracking number"
                  required
                  ref={el => (this.trackingNumber = el)}
                />
                <button type="submit">Assign Partner</button>
              </form>
            </div>
          </ul>
        </div>
        <div class="logout">
          <a href="admin_login.html">Logout</a>
        </div>
      </div>
      </body>
    );
  }
}
