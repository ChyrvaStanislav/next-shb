const HISTORY = 'history';

const getHistory = () => (sessionStorage.getItem(HISTORY) ? JSON.parse(sessionStorage.getItem(HISTORY)) : []);

const popHistory = () => {
  const localHistory = getHistory();

  if (localHistory.length === 0) {
    return;
  }

  sessionStorage.setItem(HISTORY, JSON.stringify(localHistory.slice(0, -1)));
};

const addPath = (path = window.location.pathname) => {
  const localHistory = getHistory();

  if (localHistory.length > 0 && localHistory[localHistory.length - 1] === path) {
    return;
  }

  sessionStorage.setItem(HISTORY, JSON.stringify([...localHistory, path]));
};

const getHistoryLength = () => {
  const history = getHistory();

  return history.length;
};

const goBack = () => {
  const history = getHistory();

  history.pop();

  const previusPage = history[history.length - 1];

  popHistory();

  window.location.replace(previusPage);
};

const clearHistory = () => sessionStorage.removeItem(HISTORY);

export {
  addPath,
  getHistory,
  getHistoryLength,
  goBack,
  clearHistory,
};
