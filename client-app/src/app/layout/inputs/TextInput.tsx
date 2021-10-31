import { TextField } from '@mui/material'
import { useField } from 'formik'
import React from 'react'
interface Props {
    placeholder?: string;
    idName: string;
    label: string;
    type?: string;
    disabled?: boolean | null;
}

export default function TextInput({placeholder, idName, label, type, disabled}: Props){
    const [field, meta] = useField(idName);
    return (
        <TextField
            id={idName}
            name={idName}
            label={label}
            value={field.value || ''}
            type={type ?? "text"}
            placeholder={placeholder ?? ""}
            error={meta.touched && !!meta.error}
            helperText={meta.touched && meta.error}
            onChange={field.onChange} 
            disabled={disabled ?? false}
        />
    )
}