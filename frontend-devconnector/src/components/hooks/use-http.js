import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { alertActions } from "../../store/alert-slice";

const useHttp = () => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);

  const sendRequest = useCallback(
    async (config, applyData) => {
      setLoading(true);
      try {
        const response = await fetch(config.url, {
          method: config.method,
          headers: config.headers ? config.headers : {},
          body: config.body ? JSON.stringify(config.body) : null,
        });

        const data = await response.json();
        setLoading(false);

        applyData(data);
      } catch (err) {
        console.log(err);
        dispatch(
          alertActions.alert({
            id: "q1",
            alertType: "danger",
            msg: err.message,
          })
        );
      }
      setLoading(false);
    },
    [dispatch]
  );

  return {
    sendRequest,
    isLoading,
  };
};

export default useHttp;
