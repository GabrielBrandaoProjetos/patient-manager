import { forwardRef, useState, useImperativeHandle } from "react";
import { Modal, Backdrop, Fade, Avatar } from "@material-ui/core";
import { useStyles } from "./PatientModal.style";
import { useTableContext } from "../../contexts/TableContext";

export interface ModalHandles{
  openModal: () => void;
}

interface PatientModalProps{
  patient?: string;
}

const PatientModal: React.ForwardRefRenderFunction<ModalHandles, PatientModalProps> = (props, ref) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const {patientDetails} = useTableContext()  

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };
  
  useImperativeHandle(ref, () => {
    return{
      openModal
    }
  })

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
            <Avatar alt="" src="/static/images/avatar/1.jpg" className={classes.avatar} />
            
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default forwardRef(PatientModal)