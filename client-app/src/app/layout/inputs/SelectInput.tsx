import { MenuItem, OutlinedInput } from '@mui/material'
import { useField } from 'formik'
import Select from '@mui/material/Select';
import React from 'react'

interface Props {
    placeholder?: string;
    idName: string;
    label: string;
    options: any[];
    type?: string;
    disabled?: boolean | null;
}

export default function SelectInput({ idName, label, options, disabled}: Props){
    const [field, meta] = useField(idName);
    return (
        <Select 
            label={label}
            id={idName}
            name={idName}
            value={field.value}
            onChange={field.onChange}
            error={meta.touched && !!meta.error}
            input={<OutlinedInput label={idName}/>}
        >
            {options.map(option => {
                return (<MenuItem
                    key={option}
                    value={option}
                >
                {option}
                </MenuItem>)
            })}

        </Select>
    )
}