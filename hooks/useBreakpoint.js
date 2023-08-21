import { createBreakpoint } from 'react-use';

const useBreakpoint = createBreakpoint({
  none: 0,
  xs: 320,
  sm: 568,
  md: 768,
  lg: 1024,
  xl: 1344,
});

const useCustomBreakpoint = () => {
  const breakpoint = useBreakpoint();

  return breakpoint;
};

export default useCustomBreakpoint;
