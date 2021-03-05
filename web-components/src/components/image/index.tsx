import React, { useRef, useState, useEffect } from 'react';

export interface ImageProps {
  src: string; // image storage url
  alt: string;
  options?: any; //todo
  ext?: string; //todo maybe not
}

export default function Image({ src, alt = '', options = {}, ext = 'jpg' }: ImageProps): JSX.Element {
  const imgRef = useRef<HTMLElement | null>(null);
  const [width, setWidth] = useState(0);
  const [queryString, setQueryString] = useState('');
  const [path, setPath] = useState('');

  // Destructure props and state
  useEffect(() => {
    const clientWidth = imgRef?.current?.clientWidth || 0;
    setWidth(clientWidth);
  }, [imgRef]);

  // split domain from path
  useEffect(() => {
    // https://regen-registry.s3.amazonaws.com/projects/wilmot/image1.png

    const split = src.split('.com/');
    console.log('split', split);
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
    } else {
      console.log('width', width);
    }
  }, [width, imgRef, options]);

  return (
    <figure ref={imgRef}>
      {// If the container width has been set, display the image else null
      width > 0 && queryString ? (
        <img src={`http://localhost:5000/image/${path}${queryString}`} alt={alt} />
      ) : null}
    </figure>
  );
}
