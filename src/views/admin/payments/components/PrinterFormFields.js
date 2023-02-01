import { Box, Checkbox, FormControl, FormLabel, HStack, useStyleConfig, Switch, Input, Radio, RadioGroup, FormHelperText } from "@chakra-ui/react";
import TimePicker from "rc-time-picker";
import 'rc-time-picker/assets/index.css';

function PrinterFormFields(props) {
  const { variant, children, ...rest } = props;
  const { handlePrinterFieldsChange, fetchDayName, day, newPrinterFields } = props;
  const styles = useStyleConfig("PrinterFormFields", { variant });

  return (
    <Box __css={styles} {...rest}>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input type='text' name="printerName" value={newPrinterFields.printerName} onChange={handlePrinterFieldsChange} />
        {/* {!isError ? (
                          <FormHelperText>
                            Enter the name for the printer.
                          </FormHelperText>
                        ) : (
                          <FormErrorMessage>Name is required.</FormErrorMessage>
                        )} */}
      </FormControl>
      <FormControl>
        <FormLabel>Host/IP</FormLabel>
        <Input type='text' name="printerIp" value={newPrinterFields.printerIp} onChange={handlePrinterFieldsChange} />
      </FormControl>
      <FormControl>
        <FormLabel>Location</FormLabel>
        <Input type='text' name="printerLocation" value={newPrinterFields.printerLocation} onChange={handlePrinterFieldsChange} />
      </FormControl>
      <FormControl>
        <FormLabel>City</FormLabel>
        <Input type='text' name="printerCity" value={newPrinterFields.printerCity} onChange={handlePrinterFieldsChange} />
      </FormControl>
      <FormControl>
        <FormLabel>Status</FormLabel>
        <RadioGroup>
          <HStack spacing='24px' defaultValue='Draft' onChange={handlePrinterFieldsChange}>
            <Radio name="status" value='Draft'>Draft</Radio>
            <Radio name="status" value='Online'>Online</Radio>
            <Radio name="status" value='Offline'>Offline</Radio>
          </HStack>
        </RadioGroup>
        <FormHelperText>Select status for new printer.</FormHelperText>
      </FormControl>
    </Box>
  );
}

export default PrinterFormFields;
