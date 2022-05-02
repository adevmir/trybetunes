import React, { Component } from 'react';
import Loading from '../pages/carregando';
import { getUser } from '../services/userAPI';
import { Link } from 'react-router-dom';

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
        <Link to="/search" data-testid="link-to-search"> Pesquisar </Link>
        <Link to="/favorites" data-testid="link-to-favorites"> Favoritos </Link>
        <Link to="/profile" data-testid="link-to-profile"> Perfil </Link>
      </header>
    );
  }
}

export default Header;
