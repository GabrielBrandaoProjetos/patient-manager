import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles((theme: Theme) =>
createStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    maxWidth: 600,

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    borderRadius: '5px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 8, 3),
  },
  avatar: {
    width: theme.spacing(16),
    height: theme.spacing(16),
  },
  info: {
    fontSize: "16px",
    lineHeight: 1.6,
  },
  info2: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly"
  }
}),
);