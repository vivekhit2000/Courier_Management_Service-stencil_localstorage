import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'admin-login-page',
  styleUrl: 'admin-login-page.css',
  shadow: true,
})
export class AdminLoginPage {
  @State() username: string = '';
  @State() password: string = '';

  handleSubmit(event: Event) {
    event.preventDefault();

    // Retrieve the admin object from local storage
    const storedAdmin = localStorage.getItem('admin');

    if (storedAdmin) {
      const admin = JSON.parse(storedAdmin);
      if (admin.username === this.username && admin.password === this.password) {
        // Redirect to the admin dashboard with a welcome message
        const welcomeMessage = 'Welcome ' + this.username + '!';
        localStorage.setItem('welcomeMessage', welcomeMessage);
         window.location.href = '/admin-dashboard';
      } else {
        alert('Invalid username or password. Please try again.');
      }
    } else {
      alert('No admin found. Please sign up first.');
    }
  }

  handleUsernameChange(event: Event) {
    this.username = (event.target as HTMLInputElement).value;
  }

  handlePasswordChange(event: Event) {
    this.password = (event.target as HTMLInputElement).value;
  }

  render() {
    return (
      <div class="container">
        <div class="screen">
          <div class="screen__content">
            <h1 class="header">Admin Login</h1>
            <form class="login" onSubmit={(event) => this.handleSubmit(event)}>
              <div class="login__field">
                <i class="login__icon fas fa-user"></i>
                <input
                  type="text"
                  class="login__input"
                  placeholder="Username"
                  value={this.username}
                  onInput={(event) => this.handleUsernameChange(event)}
                  required
                />
              </div>
              <div class="login__field">
                <i class="login__icon fas fa-lock"></i>
                <input
                  type="password"
                  class="login__input"
                  placeholder="Password"
                  value={this.password}
                  onInput={(event) => this.handlePasswordChange(event)}
                  required
                />
              </div>
              <button class="button login__submit" type="submit">
                <span class="button__text">Login</span>
                <i class="button__icon fas fa-chevron-right"></i>
              </button>
            </form>
            <div class="signup-link">
              <p>
                <a href="/admin-signup">Create an Account? Sign Up</a>
              </p>
            </div> 
          </div>
          <div class="screen__background">
            <span class="screen__background__shape screen__background__shape4"></span>
            <span class="screen__background__shape screen__background__shape3"></span>
            <span class="screen__background__shape screen__background__shape2"></span>
            <span class="screen__background__shape screen__background__shape1"></span>
          </div>
        </div>
      </div>
    );
  }
}





