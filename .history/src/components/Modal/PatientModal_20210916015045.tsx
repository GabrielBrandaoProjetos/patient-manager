import { forwardRef, useState, useImperativeHandle } from "react";
import { Modal, Backdrop, Fade, Avatar, Typography, Container } from "@material-ui/core";
import { useTableContext } from "../../contexts/TableContext";
import { format } from "date-fns"
import { useStyles } from "./PatientModal.style";

export interface ModalHandles{
  openModal: () => void;
}

const PatientModal: React.ForwardRefRenderFunction<ModalHandles> = ({}, ref) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const {patientDetails} = useTableContext()
  let birthDate: any

  if(patientDetails?.dob?.date){
    const date = Date.parse(patientDetails?.dob?.date)
  
    birthDate = format(date, 'dd-MM-yyyy')
  }

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
            <Avatar 
              alt={`${patientDetails?.name?.first} ${patientDetails?.name?.last}`}
              src={patientDetails?.picture?.large ?? "/static/images/avatar/1.jpg"} 
              className={classes.avatar}
            />
            
            <Typography variant="h6" className={classes.name}>
              {patientDetails?.name?.title}. {patientDetails?.name?.first} {patientDetails?.name?.last}
            </Typography>
            
            <div className={classes.info}>
              <p>Email: {patientDetails?.email}</p>

              <div className={classes.blockInfo}>
                <span className={classes.span}>Gender: {patientDetails?.gender}</span>
                <span className={classes.span}>Birth Date: {birthDate}</span>
                <span>Nationality: {patientDetails?.nat}</span>
              </div>

              <div>
                <p>
                  Address: <br />
                  {patientDetails?.location?.street?.name} - {patientDetails?.location?.street?.number}
                  , {patientDetails?.location?.city} - {patientDetails?.location?.state}, {patientDetails?.location?.country}
                  , postcode: {patientDetails?.location?.postcode}.
                </p>

                {/* <span className={classes.span}>Street: {patientDetails?.location?.street?.name}</span>
                <span className={classes.span}>Number: {patientDetails?.location?.street?.number}</span>
                <span className={classes.span}>City: {patientDetails?.location?.city}</span>
                <span className={classes.span}>State: {patientDetails?.location?.state}</span>
                <span className={classes.span}>Country: {patientDetails?.location?.country}</span>
                <span className={classes.span}>Postcode: {patientDetails?.location?.postcode}</span>
                <span className={classes.span}>Phone: {patientDetails?.phone}</span>
                <span className={classes.span}>Cell: {patientDetails?.cell}</span> */}
              </div>

              <div>
                <span className={classes.span}>Phone: {patientDetails?.phone}</span>
                <span className={classes.span}>Cell: {patientDetails?.cell}</span>
              </div>

              
              <p>ID: {patientDetails?.id?.value ?? "--------"}</p>

              
            </div>

          </Container>
        </Fade>
      </Modal>
    </div>
  );
}

export default forwardRef(PatientModal)