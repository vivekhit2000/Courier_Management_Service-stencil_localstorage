import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'tracking-page',
  styleUrl: 'tracking-page.css',
  // shadow: true,
})
export class TrackingPage {
  @State() status: string = '';
  @State() deliveryPartner: string = '';
  @State() shipmentLocation: string = '';
  @State() trackIdInput: HTMLInputElement;

  trackProduct() {
    const trackId = this.trackIdInput.value;
    const shipmentDetails = this.getShipmentDetailsFromLocalStorage(trackId);

    if (shipmentDetails) {
      this.status = shipmentDetails.status;
      this.shipmentLocation = shipmentDetails.senderAddress;
      this.deliveryPartner = shipmentDetails.partnerName;
      document.getElementById('shipmentDetails').classList.add('open');
    } else {
      this.status = 'Not Found';
      this.shipmentLocation = '';
      this.deliveryPartner = '';
      document.getElementById('shipmentDetails').classList.remove('open');
    }
  }

  getShipmentDetailsFromLocalStorage(trackId: string) {
    // Retrieve shipment details from local storage based on trackId
    const shipmentsData = localStorage.getItem('shipments');
    if (shipmentsData) {
      const shipments = JSON.parse(shipmentsData);
      const shipment = shipments.find((shipment) => shipment.trackId === trackId);
      return shipment ? shipment : null;
    }
    return null;
  }

  render() {
    return (
      <body>
      <div class="box">
        <div class="container">
          <h1>Product Tracking</h1>
          <form>
            <label htmlFor="trackingNumber">Tracking Number:</label>
            <input
                type="text"
                id="trackingNumber"
                placeholder="Enter track Id"
                required
                ref={el => (this.trackIdInput = el)} />
            <button type="button" onClick={() => this.trackProduct()}>Track</button>
          </form>
          <div id="trackingResult"></div>
      
        
          <h2>Shipment Details</h2>
          <p>Status: <span id="status">{this.status}</span></p>
          <p>Delivery Partner: <span id="deliveryPartner">{this.deliveryPartner}</span></p>
          <p>Location: <span id="shipmentLocation">{this.shipmentLocation}</span></p>
          <div class="home-button">
            <a href="/home">Home</a>
          </div>
        </div>
      </div>
      </body>
    );
  }
}
