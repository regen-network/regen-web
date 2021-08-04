import React, { useRef, useState, useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';

import { getOptimizedImageSrc } from '../../utils/optimizedImageSrc';

export interface OptimizeImageProps {
  imageStorageBaseUrl?: string;
  apiServerUrl?: string;
}
export interface ImageProps extends OptimizeImageProps {
  src: string; // unoptimized source url
  alt?: string;
  options?: any;
  className?: string;
  width?: number;
  height?: number;
  backgroundImage?: boolean;
  delay?: number;
}

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  figure: {
    marginBlockStart: 0,
    marginBlockEnd: 0,
    marginInlineStart: 0,
    marginInlineEnd: 0,
  },
  background: {
    display: 'block',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
}));

/**
 * Use this component if image is stored in S3 (or app's main image store).
 * registry-server will send back an optimized version of the original.
 * To get an optimized image, you must include imageStorageBaseUrl and apiServerUrl.
 * Note: not compatible with SVGs
 */
const Image: React.FC<ImageProps> = ({
  src,
  alt = '',
  options = { q: 100 },
  className,
  backgroundImage,
  children,
  delay,
  imageStorageBaseUrl,
  apiServerUrl,
  height,
  ...rest
}) => {
  const classes = useStyles({});
  const imgRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(0);
  const [optimizedSrc, setOptimizedSrc] = useState('');
  const [serverFailed, setServerFailed] = useState(false);
  const [readyToLoad, setReadyToLoad] = useState(false);

  // Destructure props and state
  useEffect(() => {
    if (!serverFailed) {
      const clientWidth = imgRef?.current?.clientWidth || 0;
      setWidth(clientWidth);
    }
  }, [imgRef, serverFailed]);

  useEffect(() => {
    if (!!delay) {
      let delayTimer = setTimeout(() => setReadyToLoad(true), delay);
      return () => {
        clearTimeout(delayTimer);
      };
    } else {
      return setReadyToLoad(true);
    }
  }, [delay]);

  useEffect(() => {
    if (width > 0 && !serverFailed) {
      if (imageStorageBaseUrl && apiServerUrl) {
        const serverUrl = getOptimizedImageSrc(src, imageStorageBaseUrl, apiServerUrl);
        // Create an empty query string
        let queryParams = '';

        // If width is specified, otherwise use auto-detected width
        options['w'] = options['w'] || width;

        // Loop through option object and build queryString
        Object.keys(options).map((option, i) => {
          return (queryParams += `${i < 1 ? '?' : '&'}${option}=${options[option]}`);
        });
        setOptimizedSrc(`${serverUrl}${queryParams}`);
      } else {
        setOptimizedSrc(src);
      }
    } else {
      setOptimizedSrc(src);
    }
  }, [imgRef, serverFailed, src, imageStorageBaseUrl, options, width, apiServerUrl]);

  const handleError = (): void => {
    setServerFailed(true);
    setOptimizedSrc(src);
  };

  return (
    <figure ref={imgRef} className={clsx(className, classes.figure)}>
      {// If the container width has been set, display the image else null
      width > 0 && optimizedSrc && readyToLoad ? (
        backgroundImage ? (
          <div
            className={clsx(className, classes.background)}
            style={{ backgroundImage: `url(${optimizedSrc}), url(${src})` }}
          >
            {children}
          </div>
        ) : (
          <img
            {...rest}
            className={className}
            src={optimizedSrc}
            alt={alt}
            onError={handleError}
            width={width}
            height={height}
          />
        )
      ) : null}
    </figure>
  );
};

export { Image };
