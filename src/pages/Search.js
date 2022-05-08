import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import AlbumSearch from '../components/AlbumSearch';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();
    this.onInputChange = this.onInputChange.bind(this);
    this.state = {
      search: '',
      loading: false,
      artists: [],
      artistsName: '',
      // searched: false,
    };
  }

  async handleButtonClick() {
    this.setState({ loading: true });
    let { artists, search } = this.state;
    const a = await searchAlbumsAPI(search);
    search = '';
    artists = a;
    this.setState({ search, artists, loading: false });
  }

  onInputChange({ target }) {
    const { name } = target;
    this.setState({
      [name]: target.value,
    });
    this.setState({ artistsName: target.value });
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

  // Click = async () => {
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
      artists,
      loading,
      artistsName,
      // searched,
    } = this.state;
    return (
      <div>
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
            onClick={ () => this.handleButtonClick() }
          >
            Pesquisar
          </button>
          {
            loading ? <h1>Carregando...</h1>
              : <AlbumSearch albums={ artists } artist={ artistsName } />
          }
        </div>
      </div>
    );
  }
}

export default Search;
