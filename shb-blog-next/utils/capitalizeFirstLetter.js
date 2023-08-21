export default function capitalizeFirstLetter(str) {
  const lowerCaseStr = str.toString().toLowerCase();

  return lowerCaseStr.charAt(0).toUpperCase() + lowerCaseStr.slice(1);
}
