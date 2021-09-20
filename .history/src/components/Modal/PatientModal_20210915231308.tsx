import { forwardRef, useState, useImperativeHandle } from "react";
import { Modal, Backdrop, Fade, Avatar, Typography, Container } from "@material-ui/core";
import { useTableContext } from "../../contexts/TableContext";
import { format } from "date-fns"
import { useStyles } from "./PatientModal.style";
import { toDate } from "date-fns/esm";

export interface ModalHandles{
  openModal: () => void;
}

const PatientModal: React.ForwardRefRenderFunction<ModalHandles> = ({}, ref) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const {patientDetails} = useTableContext()

  const date = Date.parse(patientDetails?.dob?.date)

  const birthDate = format(date, 'yyyy-MM-dd')

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
            
            <div className={classes.info}>
              <span>Email: {patientDetails?.email}</span>

              <div className={classes.info2}>
                <span>Gender: {patientDetails?.gender}</span>
                <span>Nationality: {patientDetails?.nat}</span>
                <span>Birth Date: {birthDate}</span>
              </div>

              <div>
                <span>Street: {patientDetails?.location?.street?.name}</span>
                <span>Number: {patientDetails?.location?.street?.number}</span>
                <span>City: {patientDetails?.location?.city}</span>
                <span>State: {patientDetails?.location?.state}</span>
                <span>Country: {patientDetails?.location?.country}</span>
                <span>Postcode: {patientDetails?.location?.postcode}</span>
                <span>Phone: {patientDetails?.phone}</span>
                <span>Cell: {patientDetails?.cell}</span>
              </div>

              <div>
                <span>ID: {patientDetails?.id?.value}</span>

              </div>
            </div>

          </Container>
        </Fade>
      </Modal>
    </div>
  );
}

export default forwardRef(PatientModal)