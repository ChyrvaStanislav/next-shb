// mode can be 'a-z' or 'z-a'
const sortingKeyString = (key, mode = 'a-z') => (arg1, arg2) => {
  const arg1upper = arg1[key].toUpperCase();
  const arg2upper = arg2[key].toUpperCase();
  if (arg1upper === 'ESG') return -1;
  if (arg2upper === 'ESG') return 1;

  return mode === 'a-z' ? arg1upper.localeCompare(arg2upper) : arg2upper.localeCompare(arg1upper);
};

export default sortingKeyString;
