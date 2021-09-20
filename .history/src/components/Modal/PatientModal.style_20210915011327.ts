import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';


export const useStyles = makeStyles((theme: Theme) =>
createStyles({
  overlay: {
    background: "rgba(242, 243, 245, 0.5)",
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000
  }
}),
);