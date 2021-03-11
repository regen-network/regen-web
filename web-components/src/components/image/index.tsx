import React, { useRef, useState, useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';
interface ImageProps {
  src: string; // image storage url
  alt?: string;
  options?: any;
  className?: string;
  width?: number;
  height?: number;
  backgroundImage?: boolean;
  children?: any;
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
 * Note: not compatible with SVGs
 */
const Image: React.FC<ImageProps> = ({
  src = '',
  alt = '',
  options = {},
  className,
  backgroundImage,
  children,
  ...rest
}) => {
  const classes = useStyles({});
  const imgRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(0);
  const [optimizedSrc, setOptimizedSrc] = useState('');
  const [serverFailed, setServerFailed] = useState(false);
  const imageServer = `${process.env.REACT_APP_API_URI}/image/`;
  const imageStorageBaseUrl = process.env.REACT_APP_IMAGE_STORAGE_BASE_URL;

  // Destructure props and state
  useEffect(() => {
    if (!serverFailed) {
      const clientWidth = imgRef?.current?.clientWidth || 0;
      setWidth(clientWidth);
    }
  }, [imgRef, serverFailed]);

  useEffect(() => {
    if (width > 0 && !serverFailed && imageStorageBaseUrl) {
      const serverUrl = src.replace(imageStorageBaseUrl, imageServer);

      // Create an empty query string
      let queryParams = '';

      // If width is specified, otherwise use auto-detected width
      options['w'] = options['w'] || width;

      // Loop through option object and build queryString
      Object.keys(options).map((option, i) => {
        return (queryParams += `${i < 1 ? '?' : '&'}${option}=${options[option]}`);
      });
      setOptimizedSrc(`${serverUrl}${queryParams}`);
    }
  }, [imgRef, imageServer, serverFailed, src, imageStorageBaseUrl, options, width]);

  const handleError = (): void => {
    setServerFailed(true);
    setOptimizedSrc(src);
  };

  return (
    <figure ref={imgRef} className={clsx(className, classes.figure)}>
        {// If the container width has been set, display the image else null
        width > 0 && optimizedSrc ? (
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
            />
          )
        ) : null}
    </figure>
  );
};

export default Image;
