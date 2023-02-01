import { Box, Checkbox, FormControl, FormLabel, HStack, useStyleConfig, Switch, Modal, ModalOverlay, ModalHeader, ModalBody, Grid, GridItem, Heading, ModalFooter, Button, ModalCloseButton, ModalContent, Spacer, Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";
import TimePicker from "rc-time-picker";
import 'rc-time-picker/assets/index.css';
import { useState } from "react";
import PrinterFormFields from "./PrinterFormFields";
import PrinterTimingsCard from "./PrinterTimingsCard";

function PrinterModal(props) {
  const { variant, children, ...rest } = props;
  const { handlePrinterFieldsChange, fetchDayName, day, isOpen, onClose, modalHeading, newPrinterFields, updatePrinter, isNew, isFirstStep, setIsFirstStep, createPrinter, onChangePrinterTiming, error } = props;
  const styles = useStyleConfig("PrinterModal", { variant });
  // const [isFirstStep, setIsFirstStep] = useState(true)

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW="50rem">
        <ModalHeader>{modalHeading}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {isFirstStep ?
            <PrinterFormFields
              handlePrinterFieldsChange={handlePrinterFieldsChange}
              fetchDayName={fetchDayName}
              newPrinterFields={newPrinterFields}
            ></PrinterFormFields> : <>
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
                    onChangePrinterTiming={onChangePrinterTiming}
                    error={error}
                  ></PrinterTimingsCard>
                )
              })}</>}
          {(error && !error == '') && < Alert status='error'>
            <AlertIcon />
            <AlertTitle>Error {error.statusCode}</AlertTitle>
            <AlertDescription>{`${error.error}  <${(error.message[0] ? error.message[0] : error.message)}>`}</AlertDescription>
          </Alert>}
        </ModalBody>

        <ModalFooter>
          {!isFirstStep && <Button colorScheme='facebook' mr={3} onClick={() => {
            setIsFirstStep(!isFirstStep)
          }}
          >
            Back
          </Button>}
          <Spacer />
          <Button colorScheme='gray' mr={3} onClick={() => {
            console.log('closing', isFirstStep);
            setIsFirstStep(true)
            onClose()
          }}
          >
            Close
          </Button>
          <Button colorScheme='blue' onClick={() => {
            console.log('isNew', isNew);
            let funcToCall = () => {
              // setIsFirstStep(false)
              isNew ? createPrinter() : updatePrinter()
            }
            let allSaveFun = () => {

              setIsFirstStep(true)
              onClose()
            }
            isFirstStep ? funcToCall() : allSaveFun()
          }
          }
          >{isFirstStep ? 'Next' : 'Save'}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal >
  );
}

export default PrinterModal;
