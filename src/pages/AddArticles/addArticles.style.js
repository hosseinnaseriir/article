
import { makeStyles } from "@mui/styles";



export const useStyles=makeStyles((theme)=>({

    root: {
        height: "90vh",
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
             fontSize:'20rem',
             
          },
        
        },
}))