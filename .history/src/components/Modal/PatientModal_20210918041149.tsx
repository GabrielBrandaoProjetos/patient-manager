import { forwardRef, useState, useImperativeHandle, useEffect } from "react";
import { Modal, Backdrop, Fade, Avatar, Typography } from "@material-ui/core";
import { useTableContext } from "../../contexts/TableContext";
import { format, parseJSON } from "date-fns"
import { useHistory, useParams, Link } from "react-router-dom"
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
  
  const birthDate = format(parseJSON(patientDetails?.dob?.date), 'dd-MM-yyyy')
  
  useEffect(() => {
    if(id){  
      getPatientByID(id)
      openModal()
    }
  }, [patients])

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    history.push('')
  };
  
  useImperativeHandle(ref, () => {
    return{
      openModal
    }
  })

  return (
    <div>
      {patientDetails && (
        <>
          <Modal
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
                  </div>

                  <div>
                    <span className={classes.span}>Phone: {patientDetails?.phone}</span>
                    <span className={classes.span}>Cell: {patientDetails?.cell}</span>
                  </div>
                  {patientDetails.id?.value && (
                    <>
                      <p>ID: {patientDetails?.id?.value ?? "Este usuário não possui um ID"}</p>

                      <p>
                        To share: <Link to={patientDetails.id?.value}>http://localhost:3000/{patientDetails.id?.value}</Link>
                      </p>
                    </>
                  )}
                </div>
              </div>
            </Fade>
          </Modal>
        </>
      )}
    </div>
  );
}

export default forwardRef(PatientModal)