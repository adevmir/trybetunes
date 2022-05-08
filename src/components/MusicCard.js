import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      checked: false,
      sendingMusic: false,
    };
    this.handleCheck = this.handleCheck.bind(this);
    this.favMusics = this.favMusics.bind(this);
  }

  componentDidMount() {
    this.favMusics();
  }

  async handleCheck(musica) {
    this.setState({ sendingMusic: true });
    const { checked } = this.state;
    if (!checked) {
      await addSong(musica);
    }
    if (checked) {
      await removeSong(musica);
    }
    this.setState({ checked: !checked, sendingMusic: false });
  }

  async favMusics() {
    const { favs, allMusics } = this.props;
    const isFav = favs.some((e) => e.trackId === allMusics.trackId);
    this.setState({ checked: isFav });
  }

  render() {
    const { checked, sendingMusic } = this.state;
    const { allMusics } = this.props;
    return (
      sendingMusic ? <h3> Carregando... </h3>
        : (
          <div key={ allMusics.trackId }>
            <p>{allMusics.trackName}</p>
            <audio data-testid="audio-component" src={ allMusics.previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
            </audio>
            <label htmlFor={ allMusics.trackId }>
              Favorita
              <input
                id={ allMusics.trackId }
                type="checkbox"
                data-testid={ `checkbox-music-${allMusics.trackId}` }
                checked={ checked }
                onChange={ () => this.handleCheck(allMusics) }
              />
            </label>
          </div>
        )
    );
  }
}

MusicCard.propTypes = {
  allMusics: PropTypes.objectOf(PropTypes.any).isRequired,
  favs: PropTypes.arrayOf(Object).isRequired,
};

export default MusicCard;
