import React, { Component } from 'react';
import propTypes from 'prop-types';
// import Header from '../components/Header';
import Loading from './Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      isSaveButton: true,
      name: '',
      description: '',
      image: '',
      email: '',
    };
  }

  componentDidMount = async () => {
    this.setState({ loading: false });
    const newUser = await getUser();
    this.setState({
      name: newUser.name,
      image: newUser.image,
      description: newUser.description,
      email: newUser.email,
      loading: true,
    }, () => {
      this.saveButton();
    });
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    const newUser = value;
    this.setState({
      [name]: newUser,
    }, () => this.saveButton());
  }

  saveButton = () => {
    const { name, email, image, description } = this.state;
    if (
      name.length > 0
      && email.length > 0
      && image.length > 0
      && description.length > 0
    ) {
      this.setState({ isSaveButton: false });
    }
  }

  onClickSave = () => {
    const { history } = this.props;
    this.setState({ loading: true }, () => this.userUpdater());
    this.setState({ loading: false }, () => history.push('/profile'));
  }

  userUpdater = async () => {
    const { name, email, image, description } = this.state;
    await updateUser({ name, email, image, description });
  }

  render() {
    const {
      loading,
      name,
      email,
      image,
      description,
      isSaveButton,
    } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <div>
          {
            !loading
              ? <Loading />
              : (<form>
                <label htmlFor="image">
                  <img src="image" alt="name" />
                  <input
                    data-testid="edit-input-image"
                    name="image"
                    type="text"
                    defaultValue={ image }
                    onChange={ this.onInputChange }
                  />
                </label>
                <label htmlFor="name">
                  <input
                    data-testid="edit-input-name"
                    name="name"
                    type="text"
                    defaultValue={ name }
                    onChange={ this.onInputChange }
                  />
                </label>
                <label htmlFor="email">
                  <input
                    data-testid="edit-input-email"
                    name="email"
                    type="text"
                    defaultValue={ email }
                    onChange={ this.onInputChange }
                  />
                </label>
                <label htmlFor="description">
                  <input
                    data-testid="edit-input-description"
                    name="description"
                    type="textArea"
                    defaultValue={ description }
                    onChange={ this.onInputChange }
                  />
                </label>
                <div>
                  <button
                    type="button"
                    data-testid="edit-button-save"
                    onClick={ this.onClickSave }
                    disabled={ isSaveButton }
                  >
                    Salvar
                  </button>
                </div>
              </form>)
          }
        </div>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: propTypes.shape({ push: propTypes.func }).isRequired,
};

export default ProfileEdit;
