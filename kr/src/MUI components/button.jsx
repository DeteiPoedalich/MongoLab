import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const ColorButton = styled(Button)(({ theme, color }) => ({
    color: theme.palette.getContrastText(color),
    backgroundColor: color,
    '&:hover': {
        backgroundColor: color,
    },
}));

export default function BasicButtons(props) {
    return (
        <Stack spacing={2} direction="row" className={props.className1}>
            <ColorButton
                variant="contained"
                color={props.color}
                className={props.className2}// Передача className
            >
                {props.text}
            </ColorButton>
        </Stack>
    );
}