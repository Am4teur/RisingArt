import React from 'react';
import { TextField, Grid } from '@material-ui/core';
import { useFormContext, Controller } from 'react-hook-form';


interface formInputProps {
  name: string;
  label: string;
}

const FormInput = ({ name, label }:formInputProps) => {
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
        defaultValue=""
      />
    </Grid>
  )
}

export default FormInput;
