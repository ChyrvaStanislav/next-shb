import { useState, useEffect } from 'react';
import { useWindowScroll } from 'react-use';

const POSITION_STICKY = 'sticky';
const POSITION_RELATIVE = 'relative';

const useSticky = ({
  ref,
  top: propTop
}) => {
  const [scrollToBottom, setScrollToBottom] = useState(true);
  const [position, setPosition] = useState(POSITION_STICKY);
  const [top, setTop] = useState(propTop);
  const { y } = useWindowScroll();
  const [lastScrollCoordinate, setLastScrollCoordinate] = useState(y);
  const refHeight = ref.current?.getBoundingClientRect()?.height;
  const windowHeight = window.innerHeight;

  const fitsInWindow = () => refHeight && refHeight + propTop < windowHeight;

  const updateTop = () => {
    if (!fitsInWindow() && scrollToBottom) {
      setTop(windowHeight - refHeight);
    } else {
      setTop(propTop);
    }
  };

  const needSetPositionSticky = () => {
    const refInfo = ref.current?.getBoundingClientRect();

    if (
      position === POSITION_RELATIVE
      && ((refInfo.top > propTop && !scrollToBottom) || (refInfo?.bottom - windowHeight <= 0 && scrollToBottom))
    ) {
      return true;
    }

    return false;
  };

  useEffect(() => {
    if (y > 0) {
      if (needSetPositionSticky()) {
        updateTop();
        setPosition(POSITION_STICKY);
      }

      if ((lastScrollCoordinate - y > 0)) {
        setScrollToBottom(false);
      }

      if ((lastScrollCoordinate - y < 0)) {
        setScrollToBottom(true);
      }

      setLastScrollCoordinate(y);
    }
  }, [y]);

  useEffect(() => {
    setTop(ref.current?.offsetTop);
    setPosition(POSITION_RELATIVE);
  }, [scrollToBottom]);

  return {
    className: '',
    style: {
      top: `${top}px`,
      position,
    },
  };
};

export default useSticky;
