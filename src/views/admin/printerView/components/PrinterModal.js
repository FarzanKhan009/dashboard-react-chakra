import { Box, Checkbox, FormControl, FormLabel, HStack, useStyleConfig, Switch, Modal, ModalOverlay, ModalHeader, ModalBody, Grid, GridItem, Heading, ModalFooter, Button, ModalCloseButton, ModalContent } from "@chakra-ui/react";
import TimePicker from "rc-time-picker";
import 'rc-time-picker/assets/index.css';
import PrinterFormFields from "./PrinterFormFields";
import PrinterTimingsCard from "./PrinterTimingsCard";

function PrinterModal(props) {
  const { variant, children, ...rest } = props;
  const { handlePrinterFieldsChange, fetchDayName, day, isOpen, onClose, modalHeading, newPrinterFields } = props;
  const styles = useStyleConfig("PrinterModal", { variant });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW="80rem">
        <ModalHeader>{modalHeading}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Grid templateColumns='repeat(5, 1fr)' gap={5}>
            <GridItem
              colSpan={3}
            >
              <PrinterFormFields
                handlePrinterFieldsChange={handlePrinterFieldsChange}
                fetchDayName={fetchDayName}
                newPrinterFields={newPrinterFields}
              ></PrinterFormFields>
            </GridItem>
            <GridItem
              colSpan={2} >
              <Heading as='h6' size='xs' pb={'10px'}>
                Timings
              </Heading>
              {newPrinterFields.timings.map((day) => {
                return (
                  <PrinterTimingsCard
                    border={'1px solid'}
                    padding={'10px'}
                    mb={'20px'}
                    handlePrinterFieldsChange={handlePrinterFieldsChange}
                    fetchDayName={fetchDayName}
                    day={day}
                  ></PrinterTimingsCard>
                )
              })}
            </GridItem>
          </Grid>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme='gray'>Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default PrinterModal;
