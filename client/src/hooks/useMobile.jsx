import * as React from "react";

const BREAKPOINT_MOBILE_PX = 768;

export function useDetectMobileView() {
  const [isMobileView, setIsMobileView] = React.useState(undefined);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${BREAKPOINT_MOBILE_PX - 1}px)`);

    const updateMobileStatus = () => {
      setIsMobileView(window.innerWidth < BREAKPOINT_MOBILE_PX);
    };

    mediaQuery.addEventListener("change", updateMobileStatus);
    updateMobileStatus();

    return () => mediaQuery.removeEventListener("change", updateMobileStatus);
  }, []);

  return Boolean(isMobileView);
}
