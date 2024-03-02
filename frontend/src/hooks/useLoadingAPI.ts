import AXIOS_INSTANCE from "../apis/axiosClient";
import React from "react";

export const useLoadingAPI = () => {
  const [counter, setCounter] = React.useState<number>(0);

  const increase = React.useCallback(
    () => setCounter((counter) => counter + 1),
    [setCounter]
  );

  const decrease = React.useCallback(
    () => setCounter((counter) => counter - 1),
    [setCounter]
  );

  const interceptors = React.useMemo(
    () => ({
      request: (config: any) => {
        increase();
        return config;
      },
      response: (response: any) => {
        decrease();
        return response;
      },
      error: (error: any) => {
        decrease();
        return Promise.reject(error);
      },
    }),
    [increase, decrease]
  );

  React.useEffect(() => {
    const requestI = AXIOS_INSTANCE.interceptors.request.use(
      interceptors.request,
      interceptors.error
    );
    const responseI = AXIOS_INSTANCE.interceptors.response.use(
      interceptors.response,
      interceptors.error
    );

    return () => {
      AXIOS_INSTANCE.interceptors.request.eject(requestI);
      AXIOS_INSTANCE.interceptors.response.eject(responseI);
    };
  }, [interceptors]);

  return { isLoadingAPI: counter > 0 };
};
