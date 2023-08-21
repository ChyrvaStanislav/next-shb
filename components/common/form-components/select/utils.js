const buildOptions = (objects, labelProperty, valueProperty) => (
  objects.map(option => Object.entries(option).map(() => ({ label: option[labelProperty], value: option[valueProperty] })).pop())
);

export default buildOptions;
