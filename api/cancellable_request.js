import axios, { CancelToken } from 'axios';

let cancel;

const cancellableRequest = (path) => {
  if (cancel) cancel('cancelled');

  return axios.get(path, {
    cancelToken: new CancelToken(((c) => {
      cancel = c;
    }))
  });
};

export default cancellableRequest;
