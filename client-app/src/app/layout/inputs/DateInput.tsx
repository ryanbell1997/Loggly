import { TextField } from '@mui/material'
import { useField } from 'formik'
import React from 'react'
interface Props {
    idName: string;
    label: string;
    type?: string | null;
    style?: {} | null;
}

export default function DateInput({idName, label, type, style}: Props){
    const [field, meta] = useField(idName);
    return (
        <TextField
            id={idName}
            name={idName}
            label={label}
            value={field.value}
            type={type ?? "date"}
            error={meta.touched && !!meta.error}
            helperText={meta.touched && meta.error}
            onChange={field.onChange}  
            InputLabelProps={{
                shrink: true,
                }}
            sx={{...style}}
        />
    )
}