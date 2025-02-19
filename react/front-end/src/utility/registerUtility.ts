export const checkNumber = (ch: string) => /^[0-9]$/.test(ch);
export const checkAlphabet = (ch: string) => /^[a-zA-Z]$/.test(ch);

export const checkFirstCharNumber = (username: string) => checkNumber(username[0]);

export const checkSpecialCharacter = (username: string) => {
  const specialChar = username
    .split("")
    .filter((ch) => !(checkNumber(ch) || checkAlphabet(ch)));
  return specialChar.length > 0;
};

export const checkNumberinString = (str: string) => {
  const number = str.split("").filter((ch) => checkNumber(ch));
  return number.length > 0;
};

export const checkCapitalAlphabet = (password: string) => {
  const capitalAlphabet = password.split("").filter((ch) => /^[A-Z]$/.test(ch));
  return capitalAlphabet.length > 0;
};

export const isEmpty = (str: string) => {
  return str.trim().length === 0;
}