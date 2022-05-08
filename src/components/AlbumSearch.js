import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class AlbumSearch extends React.Component {
  render() {
    const { albums, artist } = this.props;
    return (
      albums.length === 0 ? <p>Nenhum álbum foi encontrado</p> : (
        <div>
          <h2>
            {`Resultado de álbuns de: ${artist}`}
          </h2>
          { albums.map((album) => (
            <>
              <div>
                <img src={ album.artworkUrl } alt={ album.collectionName } />
                <p>{album.collectionName}</p>
                <p>{album.collectionPrice}</p>
                <p>{album.artistName}</p>
              </div>
              <Link
                data-testid={ `link-to-album-${album.collectionId}` }
                to={ `/album/${album.collectionId}` }
                key={ album.collectionId }
              >
                mais informações
              </Link>

            </>
          ))}
        </div>
      )
    );
  }
}

AlbumSearch.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.object).isRequired,
  artist: PropTypes.string.isRequired,
};

export default AlbumSearch;
