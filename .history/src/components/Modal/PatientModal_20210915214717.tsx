import { forwardRef, useState, useImperativeHandle } from "react";
import { Modal, Backdrop, Fade, Avatar, Typography, Container } from "@material-ui/core";
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
  console.log(patientDetails);
  
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
          <Container className={classes.paper}>
            {patientDetails?.picture?.large ? (
              <Avatar alt="" src={patientDetails?.picture?.large} className={classes.avatar} />
            ) : (
              <Avatar alt="" src="/static/images/avatar/1.jpg" className={classes.avatar} />
            )}
            <Typography variant="h6">
              {patientDetails?.name?.title}. {patientDetails?.name?.first} {patientDetails?.name?.last}
            </Typography>
            
            <span>Email: {patientDetails?.email}</span>

            <div>
              <span>Gender: {patientDetails?.gender}</span>
              <span>nationality: {patientDetails?.nat}</span>
              <span>Birth Date: {patientDetails?.dob.date}</span>
            </div>

            <div>
              <span>Street: {patientDetails?.location.street.name}</span>
              <span>Number: {patientDetails?.location.street.number}</span>
              <span>City: {patientDetails?.location.city}</span>
              <span>State: {patientDetails?.location.state}</span>
              <span>Country: {patientDetails?.location.country}</span>
              <span>Postcode: {patientDetails?.location.postcode}</span>
              <span>Phone: {patientDetails?.phone}</span>
              <span>Cell: {patientDetails?.cell}</span>
            </div>

            <div>
              <span>ID: {patientDetails?.id}</span>

            </div>

          </Container>
        </Fade>
      </Modal>
    </div>
  );
}

export default forwardRef(PatientModal)