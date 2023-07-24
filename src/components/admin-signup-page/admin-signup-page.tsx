import { Component, h } from '@stencil/core';

@Component({
  tag: 'admin-signup-page',
  styleUrl: 'admin-signup-page.css'
})
export class AdminSignup {
  handleSubmit(event: Event) {
    event.preventDefault();

    const usernameInput = document.getElementById('username') as HTMLInputElement;
    const passwordInput = document.getElementById('password') as HTMLInputElement;

    const username = usernameInput.value;
    const password = passwordInput.value;

    // Create an admin object
    const admin = {
      username: username,
      password: password
    };

    // Store the admin object in local storage
    localStorage.setItem('admin', JSON.stringify(admin));

    // Redirect to admin_login.html
    window.location.href = '/admin-login';
  }

  render() {
    return (
      <div class="container">
        <h1>Admin Signup</h1>
        <form onSubmit={event => this.handleSubmit(event)} id="signup-form">
          <div class="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" required />
          </div>
          <div class="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit">Signup</button>
        </form>
      </div>
    );
  }
}
