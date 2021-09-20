import { forwardRef, useState, useImperativeHandle, useEffect } from "react";
import { Modal, Backdrop, Fade, Avatar, Typography, Container } from "@material-ui/core";
import { useTableContext } from "../../contexts/TableContext";
import { format } from "date-fns"
import { useHistory, useParams } from "react-router-dom"
import { useStyles } from "./PatientModal.style";

export interface ModalHandles{
  openModal: () => void;
}

interface ModalParams{
  id: string;
}

const PatientModal: React.ForwardRefRenderFunction<ModalHandles> = ({}, ref) => {
  const { id } = useParams<ModalParams>()
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const {patients, patientDetails, getPatientByID} = useTableContext()
  const history = useHistory()
  let birthDate: any
  
  if(patientDetails?.dob?.date){
    const date = Date.parse(patientDetails?.dob?.date)
  
    birthDate = format(date, 'dd-MM-yyyy')
  }

  useEffect(() => {
    if(id){  
      getPatientByID(id)
      openModal()
    }
  }, [patients])

  console.log("Modal >>>", patientDetails);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    history.push('http://localhost:3000/')
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
            
            <Typography variant="h5" className={classes.name}>
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