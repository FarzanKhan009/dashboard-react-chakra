import { Box, Checkbox, FormControl, FormLabel, HStack, useStyleConfig, Switch } from "@chakra-ui/react";
import TimePicker from "rc-time-picker";
import 'rc-time-picker/assets/index.css';

function Card(props) {
  const { variant, children, ...rest } = props;
  const { handlePrinterFieldsChange, fetchDayName, day, onChangePrinterTiming } = props;
  const styles = useStyleConfig("Card", { variant });

  return (
    <Box __css={styles} {...rest}>
      <FormControl display='flex' justifyContent={'space-between'} alignItems='center' pb={'2px'}>
        <FormLabel htmlFor='day' mb='0'>
          {day.day}
        </FormLabel>
        <Switch id='day' isChecked={day.isDayOn} value={!day.isDayOn} name={`isDayOn ${day.day}`} onChange={handlePrinterFieldsChange} />
      </FormControl>
      {day.isDayOn && <>
        <FormControl alignItems='center'>
          <HStack justifyContent={'space-between'} alignItems='center'>
            <FormLabel alignItems='center'>
              Open 24 hours
            </FormLabel>
            <Checkbox colorScheme='green' defaultChecked={day.open24Hours} value={!day.open24Hours} name={`is24Hours ${day.day}`} onChange={handlePrinterFieldsChange} />
          </HStack>
        </FormControl>
        {!day.open24Hours && (<>
          <HStack justifyContent={'space-between'} alignItems='center' mb={'5px'}
            sx={{
              zIndex: 9999
            }
            }>
            <lable>Start Time</lable>
            <TimePicker
              value={day.startTime}
              onChange={(value) => {
                const newDay = { target: 'startTime', day: day.day, startTime: value };
                handlePrinterFieldsChange(newDay);
              }}
              showSecond={false}
              allowEmpty
              use12Hours
              popupStyle={{
                zIndex: 99999
              }}
            />
          </HStack>
          <HStack justifyContent={'space-between'} alignItems='center' mb={'5px'}>
            <lable>End Time</lable>
            <TimePicker
              value={day.endTime}
              onChange={(value) => {
                const newDay = { target: 'endTime', day: day.day, endTime: value };
                handlePrinterFieldsChange(newDay);
              }}
              showSecond={false}
              allowEmpty
              use12Hours
              popupStyle={{
                zIndex: 99999
              }}
            />
          </HStack>
        </>)}
      </>}
    </Box>
  );
}

export default Card;
