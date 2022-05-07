import { Button, Grid, TextField } from "@mui/material"
import { FormGroup } from '@mui/material';
import { useState } from "react";

export const PostSettings = ({post}) => {
    const [userName, setUserName] = useState(post.user_name)

    const handleChange = (e) => {
        setUserName(e.target.value)
    }

    const handleChangeUserName = () => {

    }

    return (
        <Grid>
        <TextField size="small" id="outlined-basic" label="User Name" variant="outlined" value={userName} onChange={handleChange}/>
        <Button variant="outlined" size="medium" onclick={handleChangeUserName}>Submit</Button>
        </Grid>
    )
}