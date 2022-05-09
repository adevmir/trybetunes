import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      // album: [],
      // musics: [],
      // loading: false,
      musicFav: [],
      gettinFavs: false,
    };
  }

  componentDidMount() {
    this.getFav();
  }

  async getFav() {
    this.setState({ gettinFavs: false });
    const user = await getFavoriteSongs();
    this.setState({ gettinFavs: true, musicFav: user });
  }

  render() {
    const {
      // album,
      // musics,
      // loading,
      gettinFavs,
      musicFav,
    } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        Favorites
        { gettinFavs ? (
          <div>
            {musicFav.map((music) => (
              <MusicCard
                allMusics={ music }
                key={ music.trackId }
                favs={ musicFav }
                favPage={ 1 }
              />
            ))}
          </div>) : 'Carregando...' }
      </div>
    );
  }
}

export default Favorites;
