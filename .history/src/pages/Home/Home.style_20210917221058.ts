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
  tableContainer: {
    maxWidth: 700,
    width: "100%",

    marginTop: 30,
    marginBottom: 20,
    backgroundColor: "#fafafa",
  },
  row: {
    color: "black",
    background: "#cbd0d0",
  },
  rowBody: {
    '&:nth-of-type(odd)': {
      backgroundColor: "#f2f2f2",
    }
  },
  cellHeader: {
    color: "black",
    fontWeight: "bold",
    position: "relative"
  },
  cellGender: {
    padding: "0 16px",
  },
  buttonMoreVert: {
    padding: 8,
    marginLeft: 16
  },
  moreVert: {
    color: "#000",
    fontSize: 20,
  },
  chooseGender: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.background.paper,
    borderRadius: '5px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 1, 2),
  },
  cellBody: {
    color: "black",
  },
  actions: {
    padding: 0
  },
  link:{
    color: "white",
    textDecoration: "none"
  },
  buttonShow: {
    padding: "4px 16px",
    textTransform: "none",
    background: "#0abab5",
  },
  loading: {
    display: "flex",
    alignItems: "center",
    color: "#78797a",
    gap: 8,
    textTransform: "uppercase",
  },
}),
);