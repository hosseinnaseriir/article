import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
 alignItems:"center",
  },
  formGroup: {
    display: "flex",
    gap: "1rem",
    
  },
  authIcon: {
      display:"flex",
      justifyContent:'center',
      "& svg":{
         fontSize:'25rem' 
      },
    },
  
}));
