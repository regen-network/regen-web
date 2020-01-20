export interface Texts {
  truncated: string;
  rest: string;
}

export function truncate(str: string, length: number): Texts {
  const sentences: string[] | null = str.match(/[^\.!\?]+[\.!\?]+/g);
  if (!sentences && str.length < length) {
    return {
      truncated: str,
      rest: '',
    };
  }
  let truncated: string = '';
  if (sentences) {
    for (var i: number = 0; i < sentences.length; i++) {
      if (truncated.length < length) {
        truncated += sentences[i];
      } else {
        break;
      }
    }
  }
  const rest: string = str.substring(truncated.length + 1);
  return { truncated, rest };
}
