import { Component, h } from '@stencil/core';
import { Route, createRouter } from 'stencil-router-v2';
const Router = createRouter();


@Component({
  tag: 'root-page',
})
export class AppRoot {
  render() {
    return (
      <Router.Switch>
        <Route path="/">
        <login-page></login-page>
        </Route>
        <Route path="/signup">
        <signup-page></signup-page>
        </Route>
        <Route path="/home">
        <home-page></home-page>
        </Route>
        <Route path="/profile">
        <home-profile-page></home-profile-page>
        </Route>
        <Route path="/pricing">
        <pricing-page></pricing-page>
        </Route>
        <Route path="/create-shipment">
        <create-shipment-page></create-shipment-page>
        </Route>
        <Route path="/shipment-details">
        <shipment-detail-page></shipment-detail-page>
        </Route>
       
        <Route path="/admin-signup">
          <admin-signup-page></admin-signup-page>
        </Route>
        <Route path="/admin-login">
          <admin-login-page></admin-login-page>
        </Route>
        <Route path="/admin-dashboard">
          <admin-dashboard></admin-dashboard>
        </Route>
        <Route path="/admin-dashboard-shipmentlist">
          <admin-dashboard-shipmentlist></admin-dashboard-shipmentlist>
        </Route>
        <Route path="/tracking-page">
          <tracking-page></tracking-page>
        </Route>

        <Route path="/view-shipment-page">
          <view-shipment-page></view-shipment-page>
        </Route>

      </Router.Switch>
    );
  }
}
