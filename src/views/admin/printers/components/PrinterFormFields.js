import { Box, Checkbox, FormControl, FormLabel, HStack, useStyleConfig, Switch, Input, Radio, RadioGroup, FormHelperText, FormErrorMessage, Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";
import TimePicker from "rc-time-picker";
import 'rc-time-picker/assets/index.css';

function PrinterFormFields(props) {
  const { variant, children, ...rest } = props;
  const { handlePrinterFieldsChange, fetchDayName, day, newPrinterFields } = props;
  const styles = useStyleConfig("PrinterFormFields", { variant });
  console.log('what received', newPrinterFields);
  const isError = (input) => input === ''


  return (
    <Box __css={styles} {...rest}>
      <FormControl mb={'20px'} isInvalid={isError(newPrinterFields.printerName)}>
        <FormLabel>Name</FormLabel>
        <Input type='text' name="printerName" value={newPrinterFields.printerName} onChange={handlePrinterFieldsChange} />
        {isError(newPrinterFields.printerName) && (
          <FormErrorMessage>Name is required.</FormErrorMessage>
        )}
      </FormControl>
      <FormControl mb={'20px'} isInvalid={isError(newPrinterFields.printerIp)}>
        <FormLabel>Host/IP</FormLabel>
        <Input type='text' name="printerIp" value={newPrinterFields.printerIp} onChange={handlePrinterFieldsChange} />
        {isError(newPrinterFields.printerIp) && (
          <FormErrorMessage>IP is required.</FormErrorMessage>
        )}
      </FormControl>
      <FormControl mb={'20px'} isInvalid={isError(newPrinterFields.printerLocation)}>
        <FormLabel>Location</FormLabel>
        <Input type='text' name="printerLocation" value={newPrinterFields.printerLocation} onChange={handlePrinterFieldsChange} />
        {isError(newPrinterFields.printerLocation) && (
          <FormErrorMessage>Location is required.</FormErrorMessage>
        )}
      </FormControl>
      <FormControl mb={'20px'} isInvalid={isError(newPrinterFields.printerCity)}>
        <FormLabel>City</FormLabel>
        <Input type='text' name="printerCity" value={newPrinterFields.printerCity} onChange={handlePrinterFieldsChange} />
        {isError(newPrinterFields.printerCity) && (
          <FormErrorMessage>City is required.</FormErrorMessage>
        )}
      </FormControl>
      <FormControl isInvalid={isError(newPrinterFields.printerStatus)}>
        <FormLabel>Status</FormLabel>
        <RadioGroup name="printerStatus" value={newPrinterFields.printerStatus} onChange={handlePrinterFieldsChange} spacing={'24px'}>
          <Radio value='Draft' mr={'24px'}>Draft</Radio>
          <Radio value='Online' mr={'24px'}>Online</Radio>
          <Radio value='Offline'>Offline</Radio>
        </RadioGroup>
        {isError(newPrinterFields.printerStatus) && (
          <FormErrorMessage>Status is required.</FormErrorMessage>
        )}
      </FormControl>
    </Box>
  );
}

export default PrinterFormFields;
