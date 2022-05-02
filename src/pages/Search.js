import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();
    this.onInputChange = this.onInputChange.bind(this);
    this.state = {
      search: '',
    //  loading: false,
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

  render() {
    const {
      search,
    } = this.state;
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
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
