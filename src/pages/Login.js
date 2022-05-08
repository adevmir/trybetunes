import React from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.onInputChange = this.onInputChange.bind(this);
    this.state = {
      nameLogin: '',
      loading: false,
      logged: false,
    };
  }

  handleClick = async () => {
    const { nameLogin } = this.state;
    this.setState({ loading: true });
    await createUser({ name: nameLogin });
    // this.setState({ loading: false });

    this.loginSucefful();
  }

  onInputChange({ target }) {
    const { name } = target;
    this.setState({
      [name]: target.value,
    });
  }

  isLoginButtonDisabled = () => {
    const {
      nameLogin,
    } = this.state;
    const minCaracter = 3;
    if (nameLogin.length >= minCaracter) {
      return false;
    }
    return true;
  }

  loginSucefful = () => {
    this.setState({ logged: true });
  }

  render() {
    const {
      nameLogin,
      loading,
      logged,
    } = this.state;
    // if (loading) return <Loading />;
    if (logged) return <Redirect to="/search" />;
    return (
      <div>
        {
          loading
            ? <Loading />
            : (
              <div data-testid="page-login">
                <form className="form">
                  <label htmlFor="name">
                    Nome:
                    <input
                      name="nameLogin"
                      type="text"
                      data-testid="login-name-input"
                      value={ nameLogin }
                      onChange={ this.onInputChange }
                    />
                  </label>

                  <button
                    // value={ nameLogin }
                    name="loginButton"
                    type="submit"
                    data-testid="login-submit-button"
                    disabled={ this.isLoginButtonDisabled() }
                    onClick={ () => this.handleClick() }
                  >
                    Entrar
                  </button>
                </form>
              </div>
            )
        }
      </div>
    );
  }
}

export default Login;
