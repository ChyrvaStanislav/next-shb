import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import classNames from 'classnames';
import { useDropzone } from 'react-dropzone';
import { Button, Typography } from 'v2_main/components/html';
import FieldControl from 'v2_main/components/common/form-components/field-control';
import {
  Shevron,
  ClearFile,
  Icon,
  CloudIcon,
} from './Icons';
import styles from './styles.module.scss';

const acceptedTypes = '.pdf,.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document';

const InputFile = (props) => {
  const {
    field,
    form,
    formId,
    disabled,
    setFieldValue,
    setFieldTouched,
  } = props;

  const { touched, errors } = form;

  const [file, setFile] = useState(null);
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles[0]) {
      setFile(acceptedFiles[0]);
      setFieldValue('file', acceptedFiles[0]);
      setFieldTouched('file', true);
      setTimeout(() => {
        form.validateField(field.name);
      }, 0);
    }
  }, []);

  const {
    getRootProps, getInputProps, inputRef, isDragActive
  } = useDropzone({
    onDrop,
    maxFiles: 2,
    noClick: true,
    noKeyboard: true,
    accept: acceptedTypes,
    disabled: file,
  });

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!file) {
      inputRef.current.click();
    }
  };

  const clearFile = () => {
    setFile(null);
    inputRef.current.value = null;
    setFieldValue('file', null);
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setFieldValue('file', e.currentTarget.files[0]);
      setFieldTouched('file', true);
      setTimeout(() => {
        form.validateField(field.name);
      }, 0);
    }
    e.stopPropagation();
  };

  useEffect(() => {
    if (isEmpty(touched)) {
      clearFile();
    }
  }, [touched]);

  return (
    <FieldControl {...props} animatedError={true}>
      <div className={classNames(styles.fileInputWrapper, { [styles.error]: touched[field.name] && errors[field.name] })}>
        <div className={classNames(styles.dragDropSection, { [styles.active]: isDragActive })} {...getRootProps()} data-testid="drop-section">
          <CloudIcon />
          <Typography
            className={styles.dragDropTip}
            type="p"
            variant="p_body"
          >
            Drag and Drop here
          </Typography>
          <Typography
            className={styles.dragDropOr}
            type="p"
            variant="p_body"
          >
            or
          </Typography>
          <Typography
            className={styles.acceptedTypes}
            type="p"
            variant="p_body"
          >
            Accepted file types: .pdf, .doc
          </Typography>
          <Button
            type="outline"
            className={classNames(styles.browse, { [styles.disabled]: file })}
            onClick={handleClick}
          >
            Upload File
          </Button>
          <div className={styles.inputWrapper}>
            <input
              {...getInputProps()}
              {...field}
              value=""
              name="file"
              type="file"
              className={classNames(styles.input, {
                [styles.disabled]: disabled,
              })}
              onChange={handleChange}
              accept={acceptedTypes}
              id={`${formId}-${field.name}`}
              data-testid="input-file"
            />
          </div>
        </div>
        {file && (
        <div className={styles.fileSection}>
          <div className={styles.infoBlock}>
            <Icon />
            <Typography
              className={styles.fileName}
              type="p"
              variant="p_body"
            >
              {file.name}
            </Typography>
            { file && !errors.file ? <Shevron /> : null }
            {errors.file && (<div className={styles.errorSign}>!</div>)}
          </div>
          <ClearFile handleClick={clearFile} />
        </div>
        )}
      </div>
    </FieldControl>
  );
};

InputFile.propTypes = {
  required: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  form: PropTypes.shape({
    touched: PropTypes.object,
    errors: PropTypes.object,
    validateField: PropTypes.func,
  }).isRequired,
  formId: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  setFieldValue: PropTypes.func,
  setFieldTouched: PropTypes.func,
};

InputFile.defaultProps = {
  required: false,
  label: '',
  placeholder: '',
  type: 'file',
  disabled: false,
  setFieldValue: () => {},
  setFieldTouched: () => {},
};

export default InputFile;
