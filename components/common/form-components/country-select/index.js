import React, { useState, useEffect } from 'react';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import Select from 'react-select';
import classNames from 'classnames';
import examples from 'libphonenumber-js/examples.mobile.json';
import { getExampleNumber, parsePhoneNumberFromString } from 'libphonenumber-js';
import ApiController from 'v2_common/api/index';
import 'v2_main/components/common/form-components/Select.scss';
import NumberFormat from 'react-number-format';
import { getPhoneNumber } from './util';
import styles from './styles.module.scss';
import Image from "next/image";


const SYMBOL_PHONE_TEMPLATE = '#';

const CountrySelect = ({
  onChange,
  onError,
  field,
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selected, setSelected] = useState(null);
  const [codeInput, setCodeInput] = useState('');
  const [defaultSelected, setDefaultSelected] = useState(null);
  const [options, setOptions] = useState([]);
  const [placeholderPhone, setPlaceholderPhone] = useState('');
  const [defaultPlaceholderPhone, setDefaultPlaceholderPhone] = useState('');
  const [templatePhone, setTemplatePhone] = useState('');
  const [defaultTemplatePhone, setDefaultTemplatePhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getSelectOptions = (countries, userCountry = 'US') => {
    let defaultOption = {};

    // Sort countries by alphabet
    const sortedCountries = countries.sort((a, b) => a?.name?.common.localeCompare(b?.name?.common));

    const selectOptions = sortedCountries.map((country) => {
      const telCode = country?.idd?.root
        ? `${country?.idd?.root}${country?.idd?.suffixes?.length === 1 ? country?.idd?.suffixes?.[0] || '' : ''}`
        : null;
      const option = {
        value: [telCode, country?.cca2, country?.name?.common],
        label: (
          <section className={classNames(styles.optionsContainer, 'countrySelelctSelected')}>
            <div className={styles.leftPartContainer}>
              <div className={styles.imgContainer}>
                <Image src={country?.flags?.png} alt={country?.name?.common} className={styles.img} />
              </div>
              <span className={classNames(styles.title, 'countrySelelctSelectedLeftPartContainer')}>
                {country?.name?.common}
              </span>
            </div>
            <span className={classNames(styles.callingCodes, 'countrySelelctCallingCodes')}>
              {telCode}
            </span>
          </section>
        )
      };
      if (country?.cca2 === userCountry) {
        defaultOption = option;
      }

      return option;
    });

    // Check that the option has full data
    const validSelectOptions = selectOptions.filter(({ value }) => value?.[0] && value?.[1] && value?.[2]);

    return { options: validSelectOptions, defaultOption };
  };

  const getTemplatePhone = (selectedOption) => {
    const phone = getExampleNumber(selectedOption?.value[1], examples);
    const parsePhoneNumber = parsePhoneNumberFromString(phone.number);
    const internationalPhoneNumber = parsePhoneNumber.format('INTERNATIONAL');
    const callingCode = selectedOption?.value[0];
    const phoneNumberWithoutCallingCode = internationalPhoneNumber.slice(callingCode.length + 1);
    const phoneTemplate = phoneNumberWithoutCallingCode.replace(new RegExp('[0-9]', 'g'), SYMBOL_PHONE_TEMPLATE);

    return {
      phoneNumberWithoutCallingCode,
      phoneTemplate,
    };
  };

  const handleChangeSelect = (selectedOption) => {
    setSelected(selectedOption);
    setPhoneNumber('');
    setPlaceholderPhone(getTemplatePhone(selectedOption).phoneNumberWithoutCallingCode);
    setTemplatePhone(getTemplatePhone(selectedOption).phoneTemplate);
  };

  const getFullNumber = () => JSON.stringify({ code: selected?.value[0] || codeInput, phoneNumber });

  const getErrorMessages = () => {
    if (phoneNumber.length > templatePhone.length && templatePhone.length > 0) {
      return 'Wrong phone number length.';
    }
    if (!/^[0-9\s]+$/.test(phoneNumber) && phoneNumber.length > 0) {
      return 'Invalid format';
    }

    return '';
  };

  const handleChangeCodeInput = (event) => {
    const { value } = event.target;
    if (value?.length > 4) {
      return;
    }

    setCodeInput(value);
  };

  const handleChangeInput = (event) => {
    const { value } = event.target;
    setPhoneNumber(value);
  };

  const setOptionsData = (countries, userCountry) => {
    const select = getSelectOptions(countries, userCountry);

    setOptions(select.options);
    setDefaultSelected(select.defaultOption);
    setDefaultPlaceholderPhone(getTemplatePhone(select.defaultOption).phoneNumberWithoutCallingCode);
    setDefaultTemplatePhone(getTemplatePhone(select.defaultOption).phoneTemplate);
    handleChangeSelect(select.defaultOption);
  };

  const resetField = () => {
    setPhoneNumber('');
    setSelected(defaultSelected);
    setCodeInput('');
    setPlaceholderPhone(defaultPlaceholderPhone);
    setTemplatePhone(defaultTemplatePhone);
    if (selected && defaultSelected) {
      handleChangeSelect(defaultSelected);
    }
  };

  useEffect(() => {
    onChange(getFullNumber());
    onError(getErrorMessages());
    field.onChange(field.name)(getFullNumber());
  }, [phoneNumber, selected, codeInput]);

  useEffect(() => {
    if (isEmpty(options)) {
      setIsLoading(true);
      Promise.all([ApiController.getUserCountry(), ApiController.getCountries()])
        .then((values) => {
          const userCountry = values[0].data;
          const countries = values[1].data;
          setOptionsData(countries, userCountry);
          setIsLoading(false);
        })
        .catch(() => {
          // Make single countries request in case of getUserCountry response failure
          ApiController.getCountries().then(({ data }) => {
            setOptionsData(data, 'US');
            setIsLoading(false);
          }).catch(() => {
            setIsLoading(false);
          });
        });
    }
  }, [options]);

  useEffect(() => {
    const { value } = field;
    const fullPhoneNumber = getFullNumber();

    if (getPhoneNumber(value) !== getPhoneNumber(fullPhoneNumber)) {
      resetField();
    }
  }, [field?.value]);

  const customStyles = {
    control: base => ({
      ...base,
      boxShadow: '#ccc',
      borderColor: '#ccc',
      '&:hover': {
        borderColor: '#ccc',
      },
      'react-select__control--is-focused': {
        borderColor: 'red',
      }
    })
  };

  return (
    <section className={classNames(styles.mainContainer, 'countrySelectContainer')}>
      <div className={styles.selectContainer}>
        { options?.length > 0 || isLoading ? (
          <Select
            options={options}
            classNamePrefix="react-select"
            name="questionType"
            value={selected || defaultSelected}
            onChange={handleChangeSelect}
            styles={customStyles}
          />
        ) : (
          <input
            className={classNames(styles.input, styles.codeInput)}
            placeholder="+1"
            value={codeInput}
            onChange={handleChangeCodeInput}
          />
        ) }
      </div>
      { options?.length > 0 || isLoading
        ? (
          <NumberFormat
            {...field}
            className={classNames(styles.input, styles.numberInput)}
            placeholder={placeholderPhone}
            value={phoneNumber}
            onChange={handleChangeInput}
            format={`${templatePhone}##########################`}
          />
        ) : (
          <input
            {...field}
            className={classNames(styles.input, styles.numberInput)}
            placeholder={placeholderPhone}
            value={phoneNumber}
            onChange={handleChangeInput}
          />
        )}
    </section>
  );
};

CountrySelect.propTypes = {
  onChange: PropTypes.func,
  onError: PropTypes.func,
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
};

CountrySelect.defaultProps = {
  onChange: () => { },
  onError: () => { },
};

export default CountrySelect;
