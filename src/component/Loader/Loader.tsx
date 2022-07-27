import React from "react";
import {CircularProgress, Box, styled} from "@mui/material";

const Container=styled(Box)`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100vh;
`

const Loader=()=>{

    return (
        <Container>
            <CircularProgress/>
        </Container>
    )
}


export {
    Loader
}
