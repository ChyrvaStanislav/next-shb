import { lazy } from 'react';
import SomethingWrong from 'v2_main/components/common/something-wrong';


/**
 * User Story:
 *   When the new build of the application is deployed, file names change and the application can not find the old files.
 *   If user had the application opened before the deploy, there will be an error after deploy.
 *   https://raphael-leger.medium.com/react-webpack-chunkloaderror-loading-chunk-x-failed-ac385bd110e0
 *
 * @description
 * 1. Load async component
 * 2. Reload the page if first time catch error
 * 3. If that doesn't help, return SomethingWrong component
 *
 * @param componentImport {function} example: "() => import('v2_main/pages/home')"
 * @return {React.LazyExoticComponent<React.ComponentType<any>>}
 */
const lazyWithRetry = componentImport => lazy(async () => {
  const pageHasAlreadyBeenForceRefreshed = JSON.parse(
    window.sessionStorage.getItem(
      'page-has-been-force-refreshed'
    ) || 'false'
  );

  try {
    const component = await componentImport();

    return component;
  } catch (error) {
    if (!pageHasAlreadyBeenForceRefreshed) {
      // Assuming that the user is not on the latest version of the application.
      // Let's refresh the page immediately.
      window.sessionStorage.setItem(
        'page-has-been-force-refreshed',
        'true'
      );

      return window.location.reload();
    }

    // The page has already been reloaded
    // Assuming that user is already using the latest version of the application.
    // Let's let the application crash and raise the error.
    console.error(`from lazyWithRetry: ${error}`); // eslint-disable-line

    return SomethingWrong;
  }
});

export default lazyWithRetry;
