import React, { Component } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
// import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();
    this.onInputChange = this.onInputChange.bind(this);
    this.state = {
      search: '',
      loading: false,
      // searched: false,
    };
  }

  onInputChange({ target }) {
    const { name } = target;
    this.setState({
      [name]: target.value,
    });
  }

  isSearchButtonDisabled = () => {
    const {
      search,
    } = this.state;
    const minCaracter = 2;
    if (search.length >= minCaracter) {
      return false;
    }
    return true;
  }

  // handleClick = async () => {
  //   const {
  //     search,
  //   } = this.state;
  //   this.setState({ loading: true });
  //   const result = await searchAlbumsAPI({ search });
  //   // this.setState({ loading: false });

  //   this.loginSucefful();
  // }

  render() {
    const {
      search,
      loading,
      // searched,
    } = this.state;
    if (loading) return <Redirect to="/loading" />;
    return (
      <div data-testid="page-search">
        <Header />
        search
        <input
          name="search"
          type="text"
          data-testid="search-artist-input"
          value={ search }
          onChange={ this.onInputChange }
        />
        <button
          name="SearchButton"
          type="submit"
          data-testid="search-artist-button"
          disabled={ this.isSearchButtonDisabled() }
          onClick={ this.handleClick }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
