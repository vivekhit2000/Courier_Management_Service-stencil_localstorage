import { Component, h } from '@stencil/core';

@Component({
  tag: 'pricing-page',
  styleUrl: 'pricing-page.css',
})
export class PricingPage {
  pricingData = [
    {
      plan: 'Basic',
      price: 9.99,
      features: ['10 kg package limit', '3-5 days delivery', 'Tracking available'],
    },
    {
      plan: 'Standard',
      price: 19.99,
      features: ['20 kg package limit', '2-3 days delivery', 'Tracking available', 'Insurance included'],
    },
    {
      plan: 'Premium',
      price: 29.99,
      features: ['Unlimited package limit', '1-2 days delivery', 'Tracking available', 'Insurance included', 'Priority support'],
    },
  ];

  selectPlan(plan) {
    // Save the selected plan to local storage
    localStorage.setItem('selectedPlan', JSON.stringify(plan));
    // Redirect to create_shipment.html
    window.location.href = '/';
  }

  render() {
    return (
      <body>
      <div>
        <h1>Pricing</h1>
        <div id="pricingTable">
          {this.pricingData.map((plan) => (
            <div class="pricingCard">
              <h2>{plan.plan}</h2>
              <div class="price">₹{plan.price.toFixed(2)}</div>
              <ul>
                {plan.features.map((feature) => (
                  <li>{feature.replace('lbs', 'kg')}</li>
                ))}
              </ul>
              <button onClick={() => this.selectPlan(plan)}>Select Plan</button>
            </div>
          ))}
        </div>
        <div class="buttonContainer">
          <div class="homeButton">
            <a href="/home">&#8962;</a>
          </div>
          <div class="shipmentButton">
            <a href="/create-shipment">Shipment</a>
          </div>
        </div>
      </div>
      </body>
    );
  }
}
 