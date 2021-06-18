import { useLayoutEffect } from "react";

export default function useAuthCheck(isAuthenticated, history) {
  useLayoutEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
  }, [isAuthenticated, history]);
}
