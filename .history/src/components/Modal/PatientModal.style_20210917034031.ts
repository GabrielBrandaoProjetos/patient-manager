import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';


export const useStyles = makeStyles((theme: Theme) =>
createStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
  },
  paper: {
    maxWidth: 600,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    borderRadius: '5px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 6, 3),
  },
  avatar: {
    width: theme.spacing(16),
    height: theme.spacing(16),

    position: "absolute",
    top: 0,
    transform: "translate(0, -50%)"
  },
  name: {
    marginTop: 60 
  },
  info: {
    fontSize: "16px",
    lineHeight: 1.6,
  },
  blockInfo: {
    
  },
  span: {
    marginRight: 10
  }

}),
);