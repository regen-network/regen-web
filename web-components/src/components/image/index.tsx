import React, { useRef, useState, useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';

// interface ImageProps extends React.HTMLProps<HTMLImageElement> { TODO - errors with this
interface ImageProps {
  src: string; // image storage url
  alt?: string;
  options?: any; //todo
  className?: string;
  width?: number;
  height?: number;
}

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  figure: {
    marginBlockStart: 0,
    marginBlockEnd: 0,
    marginInlineStart: 0,
    marginInlineEnd: 0,
  },
}));

/**
 * Use this component if image is stored in S3 (or app's main image store)
 * TODO: fallback to original if server fails
 */
const Image: React.FC<ImageProps> = ({ src = '', alt = '', options = {}, className, ...rest }) => {
  const classes = useStyles({});
  const imgRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(0);
  const [queryString, setQueryString] = useState('');
  const [path, setPath] = useState('');
  const imageServer = `${process.env.REACT_APP_API_URI}/image/`;

  // Destructure props and state
  useEffect(() => {
    const clientWidth = imgRef?.current?.clientWidth || 0;
    setWidth(clientWidth);
  }, [imgRef]);

  // split domain from path TODO: clean this logic up
  useEffect(() => {
    // https://regen-registry.s3.amazonaws.com/projects/wilmot/image1.png

    const split = src.split('.com/');
    // console.log('split', split);
    setPath(split[1]);
  }, [src]);

  useEffect(() => {
    if (width > 0) {
      // Create an empty query string
      let queryParams = '';

      // If width is specified, otherwise use auto-detected width
      options['w'] = options['w'] || width;

      // Loop through option object and build queryString
      Object.keys(options).map((option, i) => {
        return (queryParams += `${i < 1 ? '?' : '&'}${option}=${options[option]}`);
      });
      setQueryString(queryParams);
    }
  }, [width, imgRef, options]);

  return (
    <figure ref={imgRef} className={clsx(className, classes.figure)}>
      {// If the container width has been set, display the image else null
      width > 0 && queryString ? (
        <img {...rest} className={className} src={`${imageServer}${path}${queryString}`} alt={alt} />
      ) : null}
    </figure>
  );
};

export default Image;
