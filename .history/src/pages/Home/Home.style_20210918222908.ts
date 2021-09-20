import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';


export const useStyles = makeStyles((theme: Theme) =>
createStyles({
  root: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: "0 16px"
  },
  header: {
    backgroundColor: "#0abab5"
  },
  title: {
    flexGrow: 1,
  },
  form: {
    maxWidth: 700,
    width: "100%",
    marginTop: 94,
  },
  inputLabel: {
    color: "#d2d2d2"
  },
  search: {
    color: "#d2d2d2",
  },
}),
);