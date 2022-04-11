import { TextField } from '@mui/material';
import { useField } from 'formik';
import React from 'react';

interface Props {
    label: string 
    idName: string
    options?: any[]
    disabled?: boolean | null
    menuItems?: (...args:any[]) => any[] | undefined
}

export default function MultiSelectInput({ label, idName, disabled, menuItems }: Props){
    const [field, meta] = useField(idName);

    return (
        <TextField
            id={idName}
            name={idName}
            label={label}
            variant={"outlined"}
            error={meta.touched && !!meta.error}
            select={true}
            SelectProps={{
                multiple: true,
                value: field.value || [],
                onChange: field.onChange
            }}
            disabled={disabled ?? false}
            >
                {  
                   menuItems !== undefined ? menuItems() : ""
                }
        </TextField>
    )
}