import generateIdFromText from './generateIdFromText';

const regXHeader = /^##\s(.+)/gm;

const getHeadersFromMarkdown = (content) => content.reduce(
  (accumulator, currentValue) => {
    let found = currentValue?.text?.match(regXHeader) || [];
    found = found.map(header => {
      const headerText = header.replace(/#/g, '').trim();

      return {
        id: generateIdFromText(headerText),
        label: headerText,
      };
    });

    return [...accumulator, ...found];
  },
  []
);

const generateTextSections = (content, headers = []) => content.map((item) => {
  const sectionList = item?.text?.split(regXHeader).filter(section => !!section && section !== '');
  if (!sectionList || sectionList?.length === 0) {
    return { ...item, textSections: [] };
  }
  const textSections = [];
  sectionList.forEach((section, index) => {
    if (headers.some(header => header.label === section.trim())) {
      const textPart = sectionList[index + 1] || '';
      textSections.push({
        label: section,
        text: `## ${section}${textPart}`,
        id: generateIdFromText(section),
      });
    } else if (!headers.some(header => header.label === sectionList[index - 1]?.trim())) {
      textSections.push({
        label: null,
        text: section,
        id: null,
      });
    }
  });

  return {
    ...item,
    textSections,
  };
});

export { generateTextSections, getHeadersFromMarkdown };
