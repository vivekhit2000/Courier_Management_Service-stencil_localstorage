// create-shipments.tsx

import { Component, h } from '@stencil/core';

@Component({
  tag: 'create-shipment-page',
  styleUrl: 'create-shipment-page.css',
})
export class CreateShipmentPage {
  handleSubmit(event: Event) {
    event.preventDefault();

    // Get form inputs
    const senderName = (document.getElementById('senderName') as HTMLInputElement).value;
    const senderEmail = (document.getElementById('senderEmail') as HTMLInputElement).value;
    const senderAddress = (document.getElementById('senderAddress') as HTMLInputElement).value;
    const packageWeight = parseFloat((document.getElementById('packageWeight') as HTMLInputElement).value);
    const packageDimensions = (document.getElementById('packageDimensions') as HTMLInputElement).value;
    const additionalInstructions = (document.getElementById('additionalInstructions') as HTMLTextAreaElement).value;
    const shippingOption = (document.getElementById('shippingOptions') as HTMLSelectElement).value;

    // Calculate shipping rate based on package details
    const rate = this.calculateRate(packageWeight, shippingOption);

    // Generate Tracking id
    const id = this.generateId();

    // Create shipment object
    const shipmentObj = {
      senderName,
      senderEmail,
      senderAddress,
      packageWeight,
      packageDimensions,
      additionalInstructions,
      shippingOption,
      shippingRate: rate,
      status: 'In Transit',
      trackingId: id,
      trackId: '',
      partnerName: '',
    };

    // Retrieve existing shipment data from local storage
    let existingShipments = JSON.parse(localStorage.getItem('shipments') || '[]');

    if (!Array.isArray(existingShipments)) {
      existingShipments = [];
    }
    // Add the new shipment to the existing array
    // localStorage.setItem('shipments', JSON.stringify(shipmentObj));
    existingShipments.push(shipmentObj);

    // Store the updated array back in local storage
    localStorage.setItem('shipments', JSON.stringify(existingShipments));

    // Redirect to shipment_detail page with the shipmentId prop
    window.location.href = "/shipment-details";
  }

  calculateRate(weight: number, shippingOption: string): string {
    // Calculate shipping rate based on weight and shipping option
    // Return the calculated rate (this is a placeholder implementation)
    let rate = 0;
    if (shippingOption === 'premium') {
      rate = weight * 2.5;
    } else if (shippingOption === 'standard') {
      rate = weight * 1.5;
    } else if (shippingOption === 'basic') {
      rate = weight * 1.2;
    }
    return rate.toFixed(2);
  }

  generateId(): string {
    // Retrieve the last generated tracking ID from local storage
    let lastTrackingId = localStorage.getItem('lastTrackingId');

    // If no previous tracking ID exists, start with 1
    let id = lastTrackingId ? parseInt(lastTrackingId) + 1 : 1;

    // Store the new tracking ID in local storage
    localStorage.setItem('lastTrackingId', id.toString());

    return id.toString();
  }

  render() {
    return (
      <div class="box">
        <h1>Create Shipment</h1>
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <label htmlFor="senderName">Sender Name:</label>
          <input type="text" id="senderName" required />

          <label htmlFor="senderEmail">Sender Email:</label>
          <input type="text" id="senderEmail" required />

          <label htmlFor="senderAddress">Sender Address:</label>
          <input type="text" id="senderAddress" required />

          <label htmlFor="packageWeight">Package Weight (in kg):</label>
          <input type="number" id="packageWeight" required />

          <label htmlFor="packageDimensions">Package Dimensions:</label>
          <input type="text" id="packageDimensions" />

          <label htmlFor="additionalInstructions">Additional Instructions:</label>
          <textarea id="additionalInstructions"></textarea>

          <label htmlFor="shippingOptions">Shipping Options:</label>
          <select id="shippingOptions">
            <option value="basic">Basic</option>
            <option value="standard">Standard</option>
            <option value="premium">Premium</option>
          </select>

          <button type="submit">Create Shipment</button>
        </form>
      </div>
    );
  }
}
