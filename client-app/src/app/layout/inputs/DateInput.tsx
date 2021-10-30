import { TextField } from '@mui/material'
import { useField } from 'formik'
import React from 'react'
interface Props {
    idName: string;
    label: string;
}

export default function DateInput({idName, label}: Props){
    const [field, meta] = useField(idName);
    return (
        <TextField
            id={idName}
            name={idName}
            label={label}
            value={field.value}
            type={"date"}
            error={meta.touched && !!meta.error}
            helperText={meta.touched && meta.error}
            onChange={field.onChange}  
            InputLabelProps={{
                shrink: true,
                }}
        />
    )
}