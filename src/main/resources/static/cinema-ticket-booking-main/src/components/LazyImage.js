import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const LazyImage = ({ 
  src, 
  alt, 
  className, 
  placeholderClass, 
  width, 
  height, 
  fallbackSrc,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && imgRef.current) {
            imgRef.current.src = imgRef.current.dataset.src;
            observer.unobserve(imgRef.current);
          }
        });
      },
      {
        rootMargin: '200px',
        threshold: 0.01
      }
    );

    const currentImg = imgRef.current;
    if (currentImg) {
      observer.observe(currentImg);
    }

    return () => {
      if (currentImg) {
        observer.unobserve(currentImg);
      }
    };
  }, [src]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  const imageSource = hasError ? fallbackSrc : src;

  return (
    <div 
      className={`lazy-image-container ${placeholderClass}`}
      style={{ 
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
    >
      {!isLoaded && !hasError && (
        <div className="lazy-image-placeholder animate-pulse" />
      )}
      
      <img
        ref={imgRef}
        data-src={imageSource}
        alt={alt}
        className={`lazy-image ${className} ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } object-cover`}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
        decoding="async"
        {...props}
      />
    </div>
  );
};

LazyImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  placeholderClass: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fallbackSrc: PropTypes.string,
};

LazyImage.defaultProps = {
  className: '',
  placeholderClass: '',
  width: '100%',
  height: 'auto',
  fallbackSrc: '/images/default-poster.jpg',
};

export default React.memo(LazyImage);