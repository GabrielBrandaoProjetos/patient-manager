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
  outlinedInput: {
    
  },
  search: {
    color: "#d2d2d2",
  },
  tableContainer: {
    maxWidth: 700,
    width: "100%",

    marginTop: 30,
    marginBottom: 20,
    backgroundColor: "#707070",
  },
  row: {
    color: "white",
    background: "#0abab5",
  },
  rowBody: {
    '&:nth-of-type(odd)': {
      backgroundColor: "#515151",
    }
  },
  cellHeader: {
    color: "white",
    fontWeight: "bold",
  },
  cellBody: {
    color: "white",
  },
  actions: {
    padding: 0
  },
  buttonShow: {
    padding: "4px 16px",
    textTransform: "none"
  },
  buttonLoading: {
    color: "#78797a",
  },
}),
);