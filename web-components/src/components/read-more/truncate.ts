export interface Texts {
  truncated: string;
  rest: string;
}

export function truncate(
  str: string,
  maxLength: number,
  restMinLength: number,
  sentenceBased: boolean,
): Texts {
  const regex = /[^\.!\?]+[\.!\?]+/g;
  let sentences: string[] | null = null;
  if (sentenceBased) sentences = str.match(regex);

  if (
    (maxLength === 0 && restMinLength === 0) ||
    maxLength < restMinLength ||
    (!sentences && sentenceBased) ||
    str.length < maxLength ||
    str.length < restMinLength
  ) {
    return {
      truncated: str,
      rest: '',
    };
  }

  let truncated = '',
    tmpTruncated = '';
  let restLength = str.length;
  if (sentences && sentenceBased) {
    for (var i: number = 0; i < sentences.length; i++) {
      restLength -= sentences[i].length;
      tmpTruncated += sentences[i];
      if (tmpTruncated.length < maxLength && restLength > restMinLength) {
        truncated = tmpTruncated;
      } else {
        break;
      }
    }
  } else {
    restLength = str.length - maxLength;
    if (restLength <= restMinLength) {
      truncated = str;
    } else {
      truncated = str.substring(0, maxLength);
    }
  }
  const rest: string = str.substring(truncated.length + 1);
  return { truncated, rest };
}
