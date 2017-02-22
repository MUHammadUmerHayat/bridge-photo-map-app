import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { getPhotos, setSelectedPhotoID, showInfoWindow, setActiveMarker, searchPhotos, handleInput  } from '../../actions/index';
import PhotoGallery from '../PhotoGallery/PhotoGallery';
import PhotoMap from '../PhotoMap/PhotoMap';

class App extends Component {
  constructor() {
    super();
    this.handleKeyword = this.handleKeyword.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.props.getPhotos();
  }

  render() {
    return (
      <main>
        <h3>Photo Map App</h3>
        <input onChange={this.handleKeyword} type="text"/>
        <button onClick={this.handleSearch} type="button">Search</button>
        <h4>{this.props.status && `#${this.props.search}`}</h4>
        <PhotoGallery photos={this.props.photos} />
        <PhotoMap
          photos={this.props.photos}
          setSelectedPhotoID={this.props.setSelectedPhotoID}
          selectedPhotoID={this.props.selectedPhotoID}
          showInfoWindow={this.props.showInfoWindow}
          showingInfoWindow={this.props.showingInfoWindow}
          setActiveMarker={this.props.setActiveMarker}
          activeMarker={this.props.activeMarker} />
      </main>
    );
  }

  handleKeyword(e) {
    this.props.handleInput(e.target.value);
  }
  handleSearch() {
    this.props.searchPhotos(this.props.search);
  }
}

App.propTypes = {
  getPhotos: PropTypes.func.isRequired,
  photos: PropTypes.array.isRequired,
  setSelectedPhotoID: PropTypes.func,
  selectedPhotoID: PropTypes.number,
  showInfoWindow: PropTypes.func,
  showingInfoWindow: PropTypes.bool,
  setActiveMarker: PropTypes.func,
  activeMarker: PropTypes.object,
  handleInput: PropTypes.func,
  search: PropTypes.string.isRequired,
  status: PropTypes.bool,
  searchPhotos: PropTypes.func,
};

const mapStateToProps = state => ({
  photos: state.photos.list,
  selectedPhotoID: state.photos.selectedPhotoID,
  showingInfoWindow: state.photos.showingInfoWindow,
  activeMarker: state.photos.activeMarker,
  search: state.photos.search,
  status: state.photos.status,
});

const mapDispatchToProps = {
  getPhotos,
  setSelectedPhotoID,
  showInfoWindow,
  setActiveMarker,
  handleInput,
  searchPhotos,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
