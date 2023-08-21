const separator = '-';
const generateIdFromText = (text) => text.trim()
  .replace(/[^\w\s-]/g, '')
  .replace(/[0-9]/g, '')
  .toLowerCase()
  .replace(/\s+/g, separator)
  .toString(36);

export default generateIdFromText;
