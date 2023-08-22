const checkIfForbiddenZone = (zonesList, email) => {
  if (!zonesList || !email) return false;

  const domainsList = zonesList.map(item => item.zone);
  const isForbidden = domainsList.some(domain => email.includes(domain));

  return isForbidden;
};

export default checkIfForbiddenZone;
