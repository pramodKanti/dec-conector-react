import React from "react";
import { alertActions } from "../../store/alert-slice";
import { useDispatch, useSelector } from "react-redux";

const Alert = () => {
  // const alerts = props.alerts;
  const dispatch = useDispatch();
  const alerts = useSelector((state) => state.alert.alertData);

  setTimeout(() => dispatch(alertActions.removeAlert()), 5000);

  const show =
    alerts !== null &&
    alerts.map((alert) => {
      return (
        <div key={alert.id} className={`alert alert-${alert.alertType}`}>
          {alert.msg}
        </div>
      );
    });

  return <div className="alert-wrapper">{show}</div>;
};

export default Alert;
