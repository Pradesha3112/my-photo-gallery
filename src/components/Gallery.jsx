import React, { useState, useReducer, useCallback, useMemo, useEffect } from 'react';
import useFetchPhotos from '../hooks/useFetchPhotos';
import PhotoCard from './PhotoCard';
import SearchBar from './SearchBar';

const favouritesReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_FAVOURITE':
      if (state.some(photo => photo.id === action.payload.id)) {
        return state;
      }
      return [...state, action.payload];
    
    case 'REMOVE_FAVOURITE':
      return state.filter(photo => photo.id !== action.payload.id);
    
    case 'LOAD_FAVOURITES':
      return action.payload;
    
    default:
      return state;
  }
};

const Gallery = () => {
  const { photos, loading, error } = useFetchPhotos();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFavourites, setShowFavourites] = useState(false);
  
  const [favourites, dispatch] = useReducer(favouritesReducer, [], () => {
    const saved = localStorage.getItem('favourites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  const filteredPhotos = useMemo(() => {
    let result = photos;
    
    if (searchTerm) {
      result = result.filter(photo => 
        photo.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (showFavourites) {
      result = result.filter(photo => 
        favourites.some(fav => fav.id === photo.id)
      );
    }
    
    return result;
  }, [photos, searchTerm, favourites, showFavourites]);

  const toggleFavourite = (photo) => {
    const isFav = favourites.some(fav => fav.id === photo.id);
    dispatch({ 
      type: isFav ? 'REMOVE_FAVOURITE' : 'ADD_FAVOURITE', 
      payload: photo 
    });
  };

  const isFavourite = (photoId) => {
    return favourites.some(fav => fav.id === photoId);
  };

  // Loading State
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-3 text-sm text-gray-500">Loading photos...</p>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mb-3">
          <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <p className="text-sm text-red-600 mb-2">Failed to load photos</p>
        <button 
          onClick={() => window.location.reload()}
          className="text-sm text-blue-500 hover:text-blue-600"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Stats Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <span className="text-sm bg-white px-3 py-1.5 rounded-md shadow-sm">
            <span className="text-gray-500">Total:</span>{' '}
            <span className="font-medium text-gray-900">{photos.length}</span>
          </span>
          <span className="text-sm bg-white px-3 py-1.5 rounded-md shadow-sm">
            <span className="text-gray-500">Fav:</span>{' '}
            <span className="font-medium text-red-500">{favourites.length}</span>
          </span>
        </div>
        
        <button
          onClick={() => setShowFavourites(!showFavourites)}
          className={`text-sm px-3 py-1.5 rounded-md transition-colors ${
            showFavourites 
              ? 'bg-red-500 text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          {showFavourites ? '❤️ Showing Favourites' : '🤍 Show Favourites'}
        </button>
      </div>

      <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />

      {/* Results count */}
      <p className="text-xs text-gray-500 mb-4">
        Showing {filteredPhotos.length} photos
        {searchTerm && <span> for "{searchTerm}"</span>}
        {showFavourites && <span> (favourites only)</span>}
      </p>

      {/* Photo Grid - Perfect spacing */}
      {filteredPhotos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredPhotos.map((photo, index) => (
            <div key={photo.id} className="animate-fadeIn" style={{ animationDelay: `${index * 30}ms` }}>
              <PhotoCard
                photo={photo}
                isFavourite={isFavourite(photo.id)}
                onToggleFavourite={toggleFavourite}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg">
          <p className="text-gray-500">No photos found</p>
        </div>
      )}
    </div>
  );
};

export default Gallery;