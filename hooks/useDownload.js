import { useState, useEffect } from 'react';
import { isEmpty, uniqueId } from 'lodash';
import axios from 'axios';

const contentTypesDefinitions = {
  'application/pdf': {
    extension: '.pdf',
    title: 'PDF Document'
  },
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': {
    extension: '.docx',
    title: 'Word Document'
  },
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': {
    extension: '.pptx',
    title: 'PowerPoint Presentation'
  },
  'application/zip': {
    extension: '.zip',
    title: 'Archive'
  },
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
    extension: '.xlsx',
    title: 'Excel Document'
  },
  'application/octet-stream': {
    extension: '.xlsx',
    title: 'Excel Document'
  }
};

const validExtensions = /^.*\.(jpg|JPG|gif|GIF|doc|DOC|pdf|PDF|docx|DOCX|ppt|PPT|pptx|PPTX|zip|ZIP|xls|XLS|xlsx|XLSX)$/;

function getNameFromUrl(url) {
  const index = url.lastIndexOf('/');
  let name = '';

  if (index !== -1) {
    name = url.substr(index + 1);
  } else {
    name = uniqueId();
  }

  return name;
}

const download = (documentLink, documentName) => {
  axios({
    url: documentLink,
    method: 'GET',
    responseType: 'blob',
  }).then((response) => {
    if (isEmpty(documentName)) return;

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', documentName);
    document.body.appendChild(link);
    link.click();
  });
};

const isPdf = (document) => {
  if (document?.headers['content-type']) {
    const contentType = document?.headers['content-type'];

    return contentTypesDefinitions[contentType].extension === '.pdf';
  }

  return false;
};

const useDownload = (url) => {
  const [document, setDocument] = useState(undefined);
  const [contentType, setContentType] = useState(undefined);
  const [isDocument, setIsDocument] = useState(false);
  const isFirefox = typeof InstallTrigger !== 'undefined';

  useEffect(() => {
    axios({
      url,
      method: isFirefox ? 'GET' : 'HEAD',
      responseType: 'blob',
    })
      .then((result) => {
        const { headers } = result;
        const resContentType = headers['content-type'];
        const pureFileName = getNameFromUrl(url);
        const documentName = pureFileName.match(validExtensions)
          ? pureFileName
          : `${pureFileName}${contentTypesDefinitions[resContentType].extension}`;

        setDocument({
          ...result,
          documentName,
        });
        setIsDocument(true);
        setContentType(contentTypesDefinitions[resContentType].title);
      })
      .catch(() => setIsDocument(false));
  }, []);

  return {
    document,
    isDocument,
    contentType,
    download: () => download(url, document?.documentName),
    isPdf: () => isPdf(document),
  };
};

export default useDownload;
