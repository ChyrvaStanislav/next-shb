import handleError from './handleError';


/**
 * @param timeout {Number}
 */
const injectHotjar = (timeout) => {
  const hotjar = document.createElement('script');
  hotjar.type = 'text/plain';
  hotjar.class = 'optanon-category-C0004';
  hotjar.text = `${!function(t,h,e,j,s,n){t.hj=t.hj||function(){(t.hj.q=t.hj.q||[]).push(arguments)},t._hjSettings={hjid:1638007,hjsv:6},s=h.getElementsByTagName("head")[0],(n=h.createElement("script")).async=1,n.src="https://static.hotjar.com/c/hotjar-"+t._hjSettings.hjid+".js?sv="+t._hjSettings.hjsv,s.appendChild(n)}(window,document)}`; // eslint-disable-line
  hotjar.onerror = handleError;

  setTimeout(() => {
    document.head.appendChild(hotjar);
  }, timeout);
};

export default injectHotjar;
