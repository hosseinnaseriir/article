import { makeStyles } from "@mui/styles"

export const useStyles=makeStyles((theme)=>({

    homeCard:{
        height:'50%',
        display:'flex',
        width:'20rem',
        backgroundColor:theme.palette.grey[50],
        flexDirection:'column',
        '& a':{
            color:theme.palette.grey[800],
            '&:hover':{
                color:theme.palette.primary.main,
                transition:'all .3s ease',
            },
            '& svg':{
                fontSize:'10rem',
            },
            '& p':{
                fontSize:'2rem',
            },
        },
        boxShadow: theme.shadows[3],
        borderRadius:'1rem!important',
       
       flexGrow:1,
 
    
    }
}))
