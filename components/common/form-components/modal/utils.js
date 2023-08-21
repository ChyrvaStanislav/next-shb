export function disableBody(callback = () => { }) {
  if (typeof document !== 'undefined' && typeof window !== 'undefined') {
    callback();
    document.body.setAttribute(
      'style',
      'overflow: hidden; width: 100%;'
    );
    // const root = document.querySelector('#root');
    const scrollTop = (window.scrollY || window.pageYOffset);
    // We need to 'scroll' a page 1 pixel less due to default roundings of scrollY and pageYOffset
    const top = scrollTop > 0 ? scrollTop - 1 : 0;
    // ie11 fix
    const styleBottom = scrollTop === 0 ? 'bottom: 0;' : '';
    document.body.setAttribute(
      'style',
      `position: fixed; top: -${top}px; width: 100%; min-height: 100vh; ${styleBottom}`
    );
  }
}

export function enableBody() {
  if (typeof document !== 'undefined' && typeof window !== 'undefined') {
    // const root = document.querySelector('#root');
    const scrollTo = Math.abs(parseInt(document.body?.style?.top, 10));
    document.body.removeAttribute('style');
    document.body?.removeAttribute('style');
    window.scrollBy(0, scrollTo);
  }

}
