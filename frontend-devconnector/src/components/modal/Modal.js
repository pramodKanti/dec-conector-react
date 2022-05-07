import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { alertActions } from "../../store/alert-slice";

const ModalContent = () => {
  const dispatch = useDispatch();
  const alerts = useSelector((state) => state.alert.alertData);

  // setTimeout(() => dispatch(alertActions.removeAlert()), 5000);

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

const Modal = () => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <ModalContent />,
        document.getElementById("modal-root")
      )}
    </Fragment>
  );
};

export default Modal;
