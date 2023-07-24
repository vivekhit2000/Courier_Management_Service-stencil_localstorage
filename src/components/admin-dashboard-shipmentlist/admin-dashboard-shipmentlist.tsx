import { Component, h } from '@stencil/core';

@Component({
  tag: 'admin-dashboard-shipmentlist',
  styleUrl: 'admin-dashboard-shipmentlist.css',
  // shadow: true,
})
export class ShipmentList {
  shipments: any[] = [];

  componentWillLoad() {
    // Retrieve shipments from local storage
    const storedShipments = localStorage.getItem('shipments');
    if (storedShipments) {
      this.shipments = JSON.parse(storedShipments);
    }
  }

  render() {
    return (
      <body>
      <div>
        <h1>Shipment List</h1>
        <ul id="shipment-list">
          {this.shipments.map(shipment => (
            <li>
              ID: {shipment.trackingId} | Sender Name: {shipment.senderName} | Sender Email: {shipment.senderEmail} | Tracking Id: {shipment.trackId || 'Token Not Generated'} | Status: {shipment.status}
            </li>
          ))}
        </ul>

        <div class="center">
          <a href="/admin-dashboard" class="home-button">Home</a>
        </div>
      </div>
      </body>
    );
  }
}
