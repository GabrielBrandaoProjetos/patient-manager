import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';


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
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    borderRadius: '5px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  avatar: {
    width: theme.spacing(16),
    height: theme.spacing(16),
  },
}),
);