// src/components/Login.jsx
import React, { Component } from 'react';
import {
  TextField,
  PrimaryButton,
  Stack,
  MessageBar,
  MessageBarType,
} from '@fluentui/react';
import Dashboard from './Dashboard'; // ⬅️ Import the new component

const stackTokens = { childrenGap: 15, padding: 30 };

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      message: '',
      isError: false,
      loggedIn: false,
    };
  }

  handleEmailChange = (_, value) => this.setState({ email: value });
  handlePasswordChange = (_, value) => this.setState({ password: value });

  handleLogin = () => {
    const { email, password } = this.state;

    if (email === 'kakarlamaheshbabu1999@gmail.com' && password === 'admin123') {
      this.setState({ loggedIn: true, message: '', isError: false });
    } else {
      this.setState({ message: 'Invalid credentials.', isError: true });
    }
  };

  handleLogout = () => {
    this.setState({
      loggedIn: false,
      email: '',
      password: '',
      message: '',
      isError: false,
    });
  };

 renderLoginForm = () => {
  const { email, password, message, isError } = this.state;

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#f3f2f1',
      }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault(); // Prevents page reload
          this.handleLogin(); // Calls login handler
        }}
        style={{
          maxWidth: 400,
          width: '100%',
          padding: '40px',
          backgroundColor: 'white',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          borderRadius: 10,
        }}
      >
        <Stack tokens={{ childrenGap: 20 }}>
          <h2 style={{ textAlign: 'center' }}>Login</h2>

          <TextField
            label="Email"
            value={email}
            onChange={this.handleEmailChange}
            required
          />

          <TextField
            label="Password"
            type="password"
            canRevealPassword
            value={password}
            onChange={this.handlePasswordChange}
            required
          />

          <PrimaryButton
            text="Login"
            type="submit" // Important for Enter key
            style={{ width: '100%' }}
          />

          {message && (
            <MessageBar
              messageBarType={isError ? MessageBarType.error : MessageBarType.success}
              isMultiline={false}
            >
              {message}
            </MessageBar>
          )}
        </Stack>
      </form>
    </div>
  );
};


  render() {
    return this.state.loggedIn
      ? <Dashboard onLogout={this.handleLogout} />
      : this.renderLoginForm();
  }
}

export default Login;
