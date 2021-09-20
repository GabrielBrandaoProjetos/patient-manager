import { forwardRef, useState } from "react";
import { Modal, Backdrop, Fade } from "@material-ui/core";
import { useStyles } from "./PatientModal.style";

export interface ModalHandles{
  openModal: () => void;
}

const PatientModal: React.RefForwardingComponent<ModalHandles> = (prps, ref) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={closeModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Transition modal</h2>
            <p id="transition-modal-description">react-transition-group animates me.</p>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default forwardRef(PatientModal)