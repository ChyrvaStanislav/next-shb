function getPhoneNubmerData(json) {
  try {
    const jsonData = JSON.parse(json);
    const {
      code = '',
      phoneNumber = ''
    } = jsonData;

    return {
      code,
      phoneNumber
    };
  } catch (error) {
    return {
      code: '',
      phoneNumber: ''
    };
  }
}

function getPhoneNumber(json) {
  if (json === '') return '';

  const {
    code,
    phoneNumber
  } = getPhoneNubmerData(json);

  return code + phoneNumber;
}

function getPhoneNumberForForm(json) {
  if (json === '') return '';

  const {
    code,
    phoneNumber
  } = getPhoneNubmerData(json);

  return phoneNumber ? `${code}${phoneNumber}`?.replace(/\s/g, '') : '';
}

export {
  getPhoneNumber,
  getPhoneNumberForForm,
  getPhoneNubmerData
};
