import React from 'react';
import { TextField, Grid } from '@material-ui/core';
import { useFormContext, Controller } from 'react-hook-form';


interface formInputProps {
  name: string;
  label: string;
  value: string;
}

const FormInput = ({ name, label, value }:formInputProps) => {
  const { control } = useFormContext();

  return (
    <Grid item xs={12} sm={6}>
      <Controller
        as={TextField}
        control={control}
        fullWidth
        name={name}
        label={label}
        required
        defaultValue={value}
      />
    </Grid>
  )
}

export default FormInput;
