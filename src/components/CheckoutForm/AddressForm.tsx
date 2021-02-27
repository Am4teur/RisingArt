import React, { useState, useEffect } from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { commerce } from '../../lib/commerce';

import FormInput from './FormInput';
import { Code } from '@material-ui/icons';


interface addressFormProps {
  checkoutToken: any;
}

const AddressForm = ({checkoutToken}:addressFormProps) => {
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
    console.log(subdivision);
    
  };

  const fetchOptions = async (checkoutTokenId:string, country:string, region:any = null) => {
    const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region });

    setOptions(options);
    setOption(options[0].id);
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
        <form onSubmit={() => console.log("some")}>
          <Grid container spacing={3}>
            <FormInput required name="firstName" label="First name" />
            <FormInput required name="lastName"  label="Last name" />
            <FormInput required name="address1"  label="Address line 1" />
            <FormInput required name="email"     label="Email" />
            <FormInput required name="city"      label="City" />
            <FormInput required name="zip"       label="Zip / Postal code" />
            <Grid item xs={12} sm={6}>
              <InputLabel>Country</InputLabel>
              <Select value={country} fullWidth onChange={(e) => setCountry(e.target.value)}>
                { countries.map((cntry) => (
                  <MenuItem key={cntry.id} value={cntry.id}>
                    {cntry.name}
                  </MenuItem>)
                )}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Subdivision</InputLabel>
              <Select value={subdivision} fullWidth onChange={(e) => {console.log("value: " + e.target.value);
               setSubdivision(e.target.value)}}>
                { subdivisions.map((subd) => (
                  <MenuItem key={subd.id} value={subd.id}>
                    {subd.name}
                  </MenuItem>)
                )}
              </Select>
            </Grid>

          </Grid>
        </form>
      </FormProvider>
    </>
  )
}

export default AddressForm;
