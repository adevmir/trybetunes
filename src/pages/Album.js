import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      album: [],
      musics: [],
      loading: false,
      musicFav: [],
      gettinFavs: false,
    };
    this.loadingMusic = this.loadingMusic.bind(this);
    this.getFavs = this.getFavs.bind(this);
  }

  componentDidMount() {
    this.loadingMusic();
    this.getFavs();
  }

  async getFavs() {
    this.setState({ gettinFavs: false });
    const favs = await getFavoriteSongs();
    this.setState({ gettinFavs: true, musicFav: favs });
  }

  async loadingMusic() {
    const { match: { params: { id } } } = this.props;
    const musicList = await getMusics(id);
    const nameAlbum = musicList[0];
    const albumList = musicList.filter((music, i) => i !== 0);
    this.setState({ album: nameAlbum, musics: albumList, loading: true });
  }

  render() {
    const {
      album,
      musics,
      loading,
      gettinFavs,
      musicFav,
    } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {loading && gettinFavs ? (
          <div>
            <img src={ album.artistViewUrl } alt={ album.collectionName } />
            <h1 data-testid="artist-name">{ album.artistName }</h1>
            <h2 data-testid="album-name">{ album.collectionName }</h2>
            {musics.map((music) => (
              <MusicCard allMusics={ music } key={ music.trackId } favs={ musicFav } />
            ))}
          </div>) : 'Carregando...' }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Album;
