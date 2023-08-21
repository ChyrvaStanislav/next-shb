import { useEffect } from 'react';
// import injectMunchkin from 'v2_main/hooks/useScripts/functions/munchkin';
import TagManager from 'react-gtm-module';
import { botsAndToolsRegExp } from 'v2_common/constants/regularExpressions';
import injectCookiePro from './functions/cookiePro';
import injectHotjar from './functions/hotjar';
// import injectGoogleOptimize from './functions/googleOptimize';

const useScripts = () => {
  // const isMunchkinInit = useRef(false);

  const injectScripts = () => {
    injectHotjar(100);
    // injectMunchkin(isMunchkinInit.current, 1000);
    injectCookiePro(0);
    // injectGoogleOptimize(2000);
  };

  useEffect(() => {
    if (!botsAndToolsRegExp.test(navigator.userAgent)) {
      if (!(/auth\/iframe-handler/gi.test(window?.location?.href))) { // disabled GTM & GA scripts in auth SSO iframe
        TagManager.initialize({
          gtmId: 'GTM-PV6Z3PK'
        });
      }

      injectScripts();
    }
  }, [navigator.userAgent]);
};

export default useScripts;
