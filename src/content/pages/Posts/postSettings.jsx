import { Button, Grid, TextField } from "@mui/material"
import { useState } from "react";
import { httpPut } from "src/api";

export const PostSettings = ({post}) => {
    const [userName, setUserName] = useState(post.user_name)

    const handleChange = (e) => {
        setUserName(e.target.value)
    }

    const handleChangeUserName = () => {
        if (post.user_name !== userName) {
            httpPut({
                url: `/users/${post.userId}`,
                params: {
                    name: userName
                }
            })
            .then(res => console.log(res))
            .catch(err => console.log(err))
        }
        else {
            console.log('similar')
        }
    }

    return (
        <Grid>
        <TextField size="small" id="outlined-basic" label="User Name" variant="outlined" value={userName} onChange={handleChange}/>
        <Button variant="outlined" size="medium" onClick={handleChangeUserName}>Submit</Button>
        </Grid>
    )
}