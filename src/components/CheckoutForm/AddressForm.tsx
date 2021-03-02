import React, { useState, useEffect } from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { commerce } from '../../lib/commerce';

import FormInput from './FormInput';
import { Link } from 'react-router-dom';


interface addressFormProps {
  checkoutToken: any;
  next: (data:any) => void;
}

const AddressForm = ({checkoutToken, next}:addressFormProps) => {
  const [countries, setCountries] = useState<any[]>([]);
  const [country, setCountry] = useState<any>('');
  const [subdivisions, setSubdivisions] = useState<any[]>([]);
  const [subdivision, setSubdivision] = useState<any>('');
  const [options, setOptions] = useState<any[]>([]);
  const [option, setOption] = useState<any>('');
  const methods = useForm();

  const fetchCountries = async (checkoutTokenId:string) => {
    const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);

    const countriesTreated = Object.entries(countries).map(([code, name]) => ({ id: code, name: name }));

    setCountries(countriesTreated);
    setCountry(countriesTreated[0].id);
  };

  const fetchSubdivisions = async (countryId:string) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(countryId);

    const subdivisionsTreated = Object.entries(subdivisions).map(([code, name]) => ({ id: code, name: name }));

    setSubdivisions(subdivisionsTreated);
    setSubdivision(subdivisionsTreated[0].id);
  };

  const fetchOptions = async (checkoutTokenId:string, country:string, region:any = null) => {
    const optionsData = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region });

    const optionsTreated = optionsData.map((sO:any) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})` }));

    setOptions(optionsTreated);
    setOption(optionsTreated[0].id);
  };

  useEffect(() => {
    fetchCountries(checkoutToken.id);
  }, []);

  useEffect(() => {
    if(country) fetchSubdivisions(country);
  }, [country]);

  useEffect(() => {
    if (subdivision) fetchOptions(checkoutToken.id, country, subdivision);
  }, [subdivision]);

  return (
    <>
      <Typography variant="h6" gutterBottom>Address</Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data) => next({ ...data, country, subdivision, option }))}>
          <Grid container spacing={3}>
            <FormInput name="firstName" label="First name"/>
            <FormInput name="lastName"  label="Last name"/>
            <FormInput name="address1"  label="Address line 1"/>
            <FormInput name="email"     label="Email"/>
            <FormInput name="city"      label="City"/>
            <FormInput name="zip"       label="Zip / Postal code"/>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select value={country} fullWidth onChange={(e) => setCountry(e.target.value)}>
                { countries.map((cntry) => (
                  <MenuItem key={cntry.id} value={cntry.id}>
                    {cntry.name}
                  </MenuItem>)
                )}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Country Subdivision</InputLabel>
              <Select value={subdivision} fullWidth onChange={(e) => setSubdivision(e.target.value)}>
                { subdivisions.map((subd) => (
                  <MenuItem key={subd.id} value={subd.id}>
                    {subd.name}
                  </MenuItem>)
                )}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select value={option} fullWidth onChange={(e) => setOption(e.target.value)}>
                { options.map((opt) => (
                  <MenuItem key={opt.id} value={opt.id}>
                    {opt.label}
                  </MenuItem>)
                )}
              </Select>
            </Grid>
          </Grid>
          <br/>
          <div style={{ display: "flex", justifyContent: "space-between"}}>
            <Button component={Link} to="/cart" variant="outlined">Back to Cart</Button>
            <Button type="submit" variant="contained" color="primary">Next</Button>
          </div>
        </form>
      </FormProvider>
    </>
  )
}

export default AddressForm;
