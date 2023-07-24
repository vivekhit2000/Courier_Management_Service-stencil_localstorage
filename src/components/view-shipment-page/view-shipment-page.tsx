import { Component, h } from '@stencil/core';

@Component({
  tag: 'view-shipment-page',
  styleUrl: 'view-shipment-page.css',
  // shadow: true,
})
export class ShipmentListPage {
  shipmentList: any[];
  componentDidLoad() {
    // Call the function to load shipments on page load
    this.fetchShipmentsFromLocalStorage();
  }

  fetchShipmentsFromLocalStorage() {
    // // Retrieve shipments data from local storage
    // let shipmentsData = JSON.parse(localStorage.getItem('shipments'));
    // console.log(shipmentsData.length);
    // for(let s of shipmentsData){  
    //  console.log( s.trackingId);
    // }

    // if (shipmentsData != null) {
    //    this.shipments = JSON.parse(shipmentsData);
    //    console.log(this.shipments.length);
    //   // this.shipmentList = shipments;
    // } else {
    //   // If no shipments found in local storage, initialize with an empty array
    //   this.shipmentList = [];
    // }
    let shipList = document.getElementById("shipment-list");
    console.log(shipList);
    let list = ``;
    let shipmentsData = localStorage.getItem("shipments") ? JSON.parse(localStorage.getItem("shipments")) : [];
    for(let ship of shipmentsData){
      list += `<ul>
      <li>ID: ${ship.trackingId} | Name: ${ship.senderName} | TrackId: ${ship.trackId}  | Email: ${ship.senderEmail} | Satatus: ${ship.status}</li>
      </ul>`;
      shipList.innerHTML = list;
    }
    
  }

  render() {
    return (
      <div class="container">
        <h1>Shipment List</h1>
        <div id="shipment-list">
          {/* {this.shipmentList.map((shipments) => ( */}
            {/* <li>
              ID: {this.shipments.trackingId} | Sender Name: {this.shipments.senderName} | Sender Email: {this.shipments.senderEmail} |{' '}
              Tracking Id: {this.shipments.trackId || 'Token Not Generated'} | Status: {this.shipments.status}
            </li> */}
          {/* ))} */}
        </div>
        <div class="center">
          <a href="/admin-dashboard" class="home-button">
            Home
          </a>
        </div>
      </div>
    );
  }
}

