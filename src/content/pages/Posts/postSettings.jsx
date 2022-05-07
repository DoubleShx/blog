import { Button, Grid, TextField } from "@mui/material"
import { FormGroup } from '@mui/material';
import { useState } from "react";

export const PostSettings = ({user}) => {
    const [userName, setUserName] = useState(user.name)

    const handleChange = (e) => {
        setUserName(e.target.value)
    }
    return (
        <Grid>
        <TextField size="small" id="outlined-basic" label="User Name" variant="outlined" value={userName} onChange={handleChange}/>
        <Button variant="outlined" size="medium">Primary</Button>
        </Grid>
    )
}