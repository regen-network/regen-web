export interface Texts {
  truncated: string;
  rest: string;
}

export function truncate(
  str: string,
  maxLength: number,
  restMinLength: number,
): Texts {
  const regex = /[^\.!\?]+[\.!\?]+/g;
  const sentences: string[] | null = str.match(regex);
  if (
    (maxLength === 0 && restMinLength === 0) ||
    maxLength < restMinLength ||
    !sentences ||
    str.length < maxLength ||
    str.length < restMinLength
  ) {
    return {
      truncated: str,
      rest: '',
    };
  }
  let truncated: string = '';
  let restLength = str.length;

  if (sentences) {
    for (var i: number = 0; i < sentences.length; i++) {
      if (
        restLength > restMinLength
          ? truncated.length < maxLength
          : truncated.length >= maxLength
      ) {
        truncated += sentences[i];
        restLength -= sentences[i].length;
      } else {
        break;
      }
    }
  }
  const rest: string = str.substring(truncated.length + 1);
  return { truncated, rest };
}
