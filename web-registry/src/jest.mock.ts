import mediaQuery from 'css-mediaquery';

window.matchMedia = jest.fn().mockImplementation(query => {
  return {
    matches: mediaQuery.match(query, {
      width: window.innerWidth,
    }),
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
});

window.scrollTo = jest.fn();

export {};
