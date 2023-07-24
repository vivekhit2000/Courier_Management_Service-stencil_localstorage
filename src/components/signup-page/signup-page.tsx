import { Component, Host, State, h } from '@stencil/core';

@Component({
  tag: 'signup-page',
  styleUrl: 'signup-page.css',
  // shadow: true,
})
export class SignupPage {
  @State() username: HTMLInputElement;
  @State() dob: HTMLInputElement;
  @State() email: HTMLInputElement;
  @State() phone: HTMLInputElement;
  @State() password: HTMLInputElement;
  @State() confirmPassword: HTMLInputElement;
  @State() error: HTMLElement;

  handleSubmit(event: Event) {
    event.preventDefault();

    if (this.password.value !== this.confirmPassword.value) {
      // alert("Passwords do not match!");
      this.error = <error-message message="Passwords do not match!"></error-message>;
      return;
    }

    const user = {
      username: this.username.value,
      dob: this.dob.value,
      email: this.email.value,
      phone: this.phone.value,
      password: this.password.value,
    };

    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    storedUsers.push(user);
    localStorage.setItem('users', JSON.stringify(storedUsers));

    // Redirect to another page or perform any other action

    // For example:
    window.location.href = '/';
  }

  render() {
    return (
      <Host>
        <div class="container">
          <div class="screen">
            <div class="screen__content">
              <h1 class="header">Sign Up</h1>
              <form class="login" onSubmit={(event) => this.handleSubmit(event)}>
                <div class="login__field">
                  <i class="login__icon fas fa-user"></i>
                  <div>
                    <label htmlFor="user_name"></label>
                    <input
                      type="text"
                      class="login__input"
                      name="username"
                      id="user_name"
                      placeholder="Enter Name"
                      required
                      ref={(el) => (this.username = el as HTMLInputElement)}
                    />
                  </div>
                  <div>
                    <label htmlFor="d_o_b"></label>
                    <input
                      type="date"
                      class="login__input"
                      name="dob"
                      id="d_o_b"
                      required
                      ref={(el) => (this.dob = el as HTMLInputElement)}
                    />
                  </div>
                  <div>
                    <label htmlFor="email_id"></label>
                    <input
                      type="email"
                      class="login__input"
                      name="email"
                      id="email_id"
                      placeholder="Enter Email"
                      required
                      ref={(el) => (this.email = el as HTMLInputElement)}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone_number"></label>
                    <input
                      type="tel"
                      class="login__input"
                      name="phone"
                      id="phone_number"
                      placeholder="Enter Phone Number"
                      required
                      ref={(el) => (this.phone = el as HTMLInputElement)}
                    />
                  </div>
                  <div>
                    <label htmlFor="passwordInput"></label>
                    <input
                      type="password"
                      class="login__input"
                      name="password"
                      id="passwordInput"
                      placeholder="Enter Password"
                      required
                      ref={(el) => (this.password = el as HTMLInputElement)}
                    />
                  </div>
                  <div>
                    <label htmlFor="confirmPasswordInput"></label>
                    <input
                      type="password"
                      class="login__input"
                      name="confirmPassword"
                      id="confirmPasswordInput"
                      placeholder="Confirm Password"
                      required
                      ref={(el) => (this.confirmPassword = el as HTMLInputElement)}
                    />
                  </div>
                </div>
                <button class="button login__submit" type="submit">
                  <span class="button__text">SignUp</span>
                  <i class="button__icon fas fa-chevron-right"></i>
                </button>
              </form>
              <div class="signup-link">
                <p>
                  <a href="/">Already have an account? Login</a>
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
        <div class="error">{this.error}</div>
      </Host>
    );
  }
}
