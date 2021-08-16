// Typescript hack for gatsby-plugin-svg
declare module '*.svg' {
  const content: any;
  export default content;
}
