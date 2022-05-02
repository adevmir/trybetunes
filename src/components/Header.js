import React, { Component } from 'react';
import Loading from '../pages/carregando';
import { getUser } from '../services/userAPI';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      user: [],
      loading: true,
    };
  }

  async componentDidMount() {
    const loggedUser = await getUser();
    this.setState({
      user: loggedUser,
      loading: false,
    });
  }

  render() {
    const { user, loading } = this.state;
    const { name } = user;
    if (loading) return <Loading />;
    return (
      <header data-testid="header-component">
        <p data-testid="header-user-name">{ name }</p>
      </header>
    );
  }
}

export default Header;
