import "./App.ErrorModal.scss";

const errorModal = (props) => {
  return (
    <>
      <div className="backdrop" onClick={props.onClose}></div>
      <div className="modal">
        <div className="errorMsg">
          <h3>Ошибка! Попробуйте зайти позже...</h3>
        </div>
      </div>
    </>
  );
};

export default errorModal;
