import React from 'react';
import { TextField, Grid } from '@material-ui/core';
import { useFormContext, Controller } from 'react-hook-form';


interface formInputProps {
  name: string;
  label: string;
  required: boolean;
}

const FormInput = ({ name, label, required }:formInputProps) => {
  const { control } = useFormContext();
  const isError = false;

  return (
    <Grid item xs={12} sm={6}>
      <Controller
        as={TextField}
        control={control}
        fullWidth
        name={name}
        label={label}
        required={required}
      />
    </Grid>
  )
}

export default FormInput;
