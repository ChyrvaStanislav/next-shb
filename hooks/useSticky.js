import { useEffect, useState } from 'react';
import { debounce } from 'lodash/function';

/**
 * @param ref {ref}
 * @param mainContainerRef {ref}
 * @param contentContainerRef {ref}
 * @param heightCorrection {number}
 * @returns {{stickyHeight: number, isSticky: boolean}}
 */
const useSticky = (ref, mainContainerRef, contentContainerRef, heightCorrection = 180) => {
  const [isSticky, setIsSticky] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [stickyHeight, setStickyHeight] = useState(0);
  const [stickyTop, setStickyTop] = useState(0);
  const [stickyScrollDisable, setStickyScrollDisable] = useState(false);

  /**
   * @description We have to set right panel sticky container height;
   */
  const getStickyHeight = debounce(() => {
    if (!stickyScrollDisable) {
      setStickyHeight(window?.innerHeight - heightCorrection > ref?.current?.scrollHeight
        ? ref?.current?.scrollHeight
        : window?.innerHeight - heightCorrection);
    }
  }, 200);

  useEffect(() => {
    getStickyHeight();
    window.addEventListener('resize', getStickyHeight, { passive: true });

    return () => {
      window.removeEventListener('resize', getStickyHeight);
    };
  }, [ref]);

  /**
   * @description If window scroll direction "to up" - scroll to the top of right panel;
   * if window scroll direction "to down" - scroll to the bottom of right panel (change top property)
   */
  const scrollRightPanel = () => {
    if (
      scrollPosition > window?.scrollY
        && stickyTop <= 0
        && isSticky
        && !stickyScrollDisable
    ) {
      const scroll = Math.ceil((scrollPosition - window?.scrollY) / 2); // Division by 2 makes scrolling smoother
      setStickyTop(stickyTop + scroll < 0
        ? stickyTop + scroll
        : 0);
    } else if (
      scrollPosition < window?.scrollY
        && stickyTop >= -(contentContainerRef?.current?.getBoundingClientRect()?.height - stickyHeight - 10) // scroll down limit
        && isSticky
        && !stickyScrollDisable
    ) {
      const scroll = Math.ceil((window?.scrollY - scrollPosition) / 2);
      setStickyTop(stickyTop - scroll > -(contentContainerRef?.current?.getBoundingClientRect()?.height - stickyHeight - 10)
        ? stickyTop - scroll
        : -(contentContainerRef?.current?.getBoundingClientRect()?.height - stickyHeight - 10));
    }
  };

  /**
   * @description Set isSticky flag (120px - header + menu height)
   */
  const setIsRightPanelSticky = debounce(() => {
    if ((window?.scrollY >= ref?.current?.getBoundingClientRect()?.top + 120)
        && (window.scrollY < mainContainerRef?.current?.getBoundingClientRect()?.height - (window.innerHeight / 2))
        && (stickyHeight >= window.innerHeight - heightCorrection)
        && !isSticky) {
      setIsSticky(true);
    } else if (((window?.scrollY < ref?.current?.getBoundingClientRect()?.top + 120)
        || (window.scrollY > mainContainerRef?.current?.getBoundingClientRect()?.height - (window.innerHeight / 2)))
        && isSticky) {
      setIsSticky(false);
    }
  }, 10);

  /**
   * @description Scroll right panel, set isSticky flag, set scrollPosition (to define scroll direction)
   */
  const onScroll = () => {
    setIsRightPanelSticky();
    setScrollPosition(window?.scrollY);
    scrollRightPanel();
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  });

  return ({
    isSticky,
    stickyHeight,
    stickyTop,
    setStickyScrollDisable
  });
};

export default useSticky;
