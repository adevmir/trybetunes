import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      desc: '',
      img: '',
      email: '',
      loading: false,
    };
  }

  componentDidMount = async () => {
    this.setState({ loading: true });
    const data = await getUser();
    this.setState({
      name: data.name,
      desc: data.description,
      img: data.image,
      email: data.email,
      loading: false,
    });
  }

  renderUserInfo() {
    const { name, email, img, desc } = this.state;
    return (
      <div>
        <div>
          <img data-testid="profile-image" src={ img } alt={ `Img do ${name}` } />
        </div>
        <div>
          <label htmlFor="nome">{name}</label>
        </div>
        <div>
          <label htmlFor="e-mail">{email}</label>
        </div>
        <div>
          <label htmlFor="descricao">{desc}</label>
        </div>
        <div>
          <Link to="/profile/edit">Editar perfil</Link>
        </div>
      </div>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        <div>
          {
            loading
              ? <Loading />
              : this.renderUserInfo()
          }
        </div>
      </div>
    );
  }
}

export default Profile;
