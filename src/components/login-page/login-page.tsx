import { Component, State, h } from '@stencil/core';

@Component({
  tag: 'login-page',
  styleUrl: 'login-page.css',
  shadow: true,
})
  


export class LoginPage {
  @State() isValidUser = false;
  username: string = '';
  password: string = '';

  handleSubmit(event: Event) {
    event.preventDefault();

    const storedUsers = JSON.parse(localStorage.getItem('users'));
    // const storedAdmin = JSON.parse(localStorage.getItem('admin')) ;
    
    if(this.username == 'admin'){
      window.location.href = '/admin-login';
    }
    else{
      for (let user of storedUsers) { 
        if (user.username === this.username && user.password === this.password) {
          this.isValidUser = true;
          sessionStorage.setItem("username", this.username);
        
          window.location.href = '/home';
           
        }
      }

      if (this.isValidUser) {
        // Credentials match, redirect to the home page
        window.location.href = '/home';
      } else {
        // Credentials do not match or user not found, show an alert message
        alert('Invalid username or password');
      }
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
            <h1 class="header">Login</h1>
            <form class="login" onSubmit={(event) => this.handleSubmit(event)}>
              <div class="login__field">
                <i class="login__icon fas fa-user"></i>
                <input
                  type="text"
                  class="login__input"
                  placeholder="User name / Email"
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
                <span class="button__text">Log In Now</span>
                <i class="button__icon fas fa-chevron-right"></i>
              </button>
            </form>
            <div class="signup-link">
              <p>
                <a href="/signup">Create an Account? Sign Up</a>
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

