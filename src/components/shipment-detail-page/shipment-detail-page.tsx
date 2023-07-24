import { Component, h } from '@stencil/core';

@Component({
  tag: 'shipment-detail-page',
  styleUrl: 'shipment-detail-page.css',
})
export class ShipmentDetailsPage {
  latestShipment: any = {};

  componentWillLoad() {
    const savedShipments = JSON.parse(localStorage.getItem('shipments') || '[]');
    if (savedShipments.length > 0) {
      this.latestShipment = savedShipments[savedShipments.length - 1];
    }
  }

  render() {
    return (
      <div>
        <h1>ThankYou for Choosing Us</h1>
      <div class="container">
      
        <h3>Shipment Details</h3>
        
        {Object.keys(this.latestShipment).length > 0 ? (
          <div>
            <p>
              <b>Tracking ID:</b> {this.latestShipment.trackingId}
            </p>
            <p>
              <b>Sender Name:</b> {this.latestShipment.senderName}
            </p>
            <p>
              <b>Status:</b> {this.latestShipment.status}
            </p>
            <p>
              <b>Location:</b> {this.latestShipment.senderAddress}
            </p>
            <p>
              <b>TrackId:</b> {this.latestShipment.trackId}
            </p>
            <p>
              <b>Price:</b> {this.latestShipment.shippingRate}
            </p>
            <p>
              <b>Weight(in Kg):</b> {this.latestShipment.packageWeight}
            </p>

          </div>
        ) : (
          <p>No shipments available.</p>
        )}
      
      </div>
      </div>
    );
  }
}

