import React, { useState } from 'react';

const PhotoCard = ({ photo, isFavourite, onToggleFavourite }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const imageUrl = `https://picsum.photos/id/${photo.id}/400/400`;
  const fallbackUrl = `https://picsum.photos/400/400?random=${photo.id}`;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Image Container - Fixed aspect ratio */}
      <div className="relative w-full pt-[100%] bg-gray-100">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        
        <img 
          src={imageError ? fallbackUrl : imageUrl}
          alt={photo.author}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            setImageError(true);
            setImageLoaded(true);
          }}
        />
      </div>

      {/* Card Footer - Clean layout */}
      <div className="p-3 flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {photo.author}
          </p>
          <p className="text-xs text-gray-500 truncate">
            ID: {photo.id}
          </p>
        </div>
        
        <button
          onClick={() => onToggleFavourite(photo)}
          className={`flex-shrink-0 ml-2 p-1.5 rounded-full transition-colors ${
            isFavourite ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
          }`}
        >
          <svg
            className="w-5 h-5"
            fill={isFavourite ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PhotoCard;