import 'rc-time-picker/assets/index.css';
// Chakra imports
import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
  Text,
  Container,
  Button,
  Input,
  InputGroup,
  InputRightAddon,
  Spacer,
  HStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Grid,
  GridItem,
  FormControl,
  FormHelperText,
  FormErrorMessage,
  RadioGroup,
  Radio,
  Switch,
  Heading,
  Stack,
  Checkbox

} from "@chakra-ui/react";
// Assets
import Usa from "assets/img/dashboards/usa.png";
// Custom components
import React, { useEffect, useState } from "react";
// Local Components
import PrinterTable from "views/admin/printers/components/PrinterTable";
import PrinterFormFields from "views/admin/printers/components/PrinterFormFields";
import PrinterModal from "views/admin/printers/components/PrinterModal";

//Development Data
import {
  printerTableColumn, defaulFieldsData
} from "views/admin/printers/variables/printerTableColumn";
import printerTableData from "views/admin/printers/variables/printerTableData.json";
import 'rc-time-picker/assets/index.css';

import { SearchIcon } from "@chakra-ui/icons";
import PrinterTimingsCard from "./components/PrinterTimingsCard";
import moment from 'moment';
import axios from 'axios';
import Stepper from 'components/stepper/Stepper';
const format = 'h:mm a';
const now = moment().hour(0).minute(0);

export default function UserReports() {
  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure()
  const [printerTableDataX, setPrinterTableData] = useState([])
  const [selectedPrinterId, setselectedPrinterId] = useState()
  const [isNew, setIsNew] = useState(true)
  const [isFirstStep, setIsFirstStep] = useState(true)

  const [newPrinterFields, setNewPrinterFields] = React.useState(defaulFieldsData)
  const [updateTable, setUpdateTable] = React.useState(true)
  const [error, setError] = useState('')

  const logAxiosError = (error) => {
    if (error.response) {
      // Request made and server responded
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      setError(error.response.data)
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
      setError('No response was received' + error.request)

    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
      setError('Could not make an API call => ' + error.message)

    }
  }
  // Similar to componentDidMount and componentDidUpdate:  
  useEffect(() => {

    var config = {
      method: 'get',
      url: `${process.env.REACT_APP_BACKEND}/api/printers`,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };
    // setLoading(true)
    axios(config).then((response) => {
      let data = response.data.data;
      data = data.map(row => {
        row = ({ ...row, printerId: `PI-${row.id}` })
        return row
      })
      setPrinterTableData(data)
    })
      .catch((error) => {
        logAxiosError(error)
      });
  }, [updateTable]);
  const sayHello = () => {

    alert("clicked")
  }



  const createPrinterTimingsInBulk = (printerId) => {
    let timingData = newPrinterFields.timings.map(e => {
      return {
        printer: printerId,
        day: e.day,
        startTime: "2012-06-22 05:40:06",
        endTime: "2012-06-22 05:40:06",
        is24HoursOpen: e.open24Hours,
        isClosed: !e.isDayOn
      }
    })
    var config = {
      method: 'post',
      url: `${process.env.REACT_APP_BACKEND}/api/printerSchedule`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(
        timingData
      ),
      withCredentials: true,
    };
    // setLoading(true)
    axios(config)
      .then((response) => {

        fetchPrinterTiming(printerId, {})
        setUpdateTable(!updateTable)
        setIsFirstStep(false)

      })
      .catch((error) => {
        logAxiosError(error)
      });
  }

  const fetchPrinterTiming = (printerId, data) => {
    var config = {
      method: 'get',
      url: `${process.env.REACT_APP_BACKEND}/api/printerSchedule/ByPrinterID/${printerId}`,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };
    // setLoading(true)
    axios(config)
      .then((response) => {
        let timingsData = response?.data;
        const timings = constructTimingArray(timingsData)
        setNewPrinterFields({
          ...newPrinterFields,
          ...data,
          ['timings']: timings
        });

      })
      .catch((error) => {
        logAxiosError(error)
      });
  }
  const fetchSinglePrinterOnEdit = (printerId) => {
    setselectedPrinterId(printerId)

    // createPrinterTimings()

    setIsNew(false)
    setselectedPrinterId(printerId)
    var config = {
      method: 'get',
      url: `${process.env.REACT_APP_BACKEND}/api/printers/${printerId}`,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };
    // setLoading(true)
    axios(config)
      .then((response) => {
        let data = response?.data?.data;
        data = {
          id: response?.data?.id,
          printerName: response?.data?.name,
          printerIp: response?.data?.host,
          printerLocation: response?.data?.address,
          printerCity: response?.data?.city,
          printerStatus: response?.data?.status,
        }

        fetchPrinterTiming(printerId, data)
        onEditOpen()

      })
      .catch((error) => {
        logAxiosError(error)
      });

  }

  const createPrinter = () => {
    var config = {
      method: 'post',
      url: `${process.env.REACT_APP_BACKEND}/api/printers`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(
        {
          name: newPrinterFields.printerName,
          host: newPrinterFields.printerIp,
          address: newPrinterFields.printerLocation,
          lat: "4.66455174",
          lng: "-74.07867091",
          city: newPrinterFields.printerCity,
          status: newPrinterFields.printerStatus
        }
      ),
      withCredentials: true,
    };
    axios(config)
      .then((response) => {

        let data = {
          id: response?.data?.id,
          printerName: response?.data?.name,
          printerIp: response?.data?.host,
          printerLocation: response?.data?.address,
          printerCity: response?.data?.city,
          printerStatus: response?.data?.status,
        }
        setselectedPrinterId(data.id)
        setNewPrinterFields({ ...newPrinterFields, ...data })
        createPrinterTimingsInBulk(data.id)
        setUpdateTable(!updateTable)
      })
      .catch((error) => {
        logAxiosError(error)
      });
  }

  const updatePrinter = () => {
    var config = {
      method: 'patch',
      url: `${process.env.REACT_APP_BACKEND}/api/printers/${selectedPrinterId}`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(
        {
          name: newPrinterFields.printerName,
          host: newPrinterFields.printerIp,
          address: newPrinterFields.printerLocation,
          lat: "4.66455174",
          lng: "-74.07867091",
          city: newPrinterFields.printerCity,
          status: newPrinterFields.printerStatus
        }
      ),
      withCredentials: true,
    };
    axios(config)
      .then((response) => {


        let data = response?.data?.data;
        data = {
          printerName: response?.data?.name,
          printerIp: response?.data?.host,
          printerLocation: response?.data?.address,
          printerCity: response?.data?.city,
          printerStatus: response?.data?.status,
        }
        setNewPrinterFields({ ...newPrinterFields, ...data })
        setUpdateTable(!updateTable)
        setIsFirstStep(false)
        // onEditOpen()

      })
      .catch((error) => {
        logAxiosError(error)
      });

  }

  const handlePageChange = () => {
  }
  const modalClose = () => {
    onEditClose()
    onClose()
    setError('')
    setNewPrinterFields(defaulFieldsData)


  }


  const fetchDayName = (ele) => {
    if (ele.day == 'mon') return 'Monday'
    else if (ele.day == 'tue') return 'Tuesday'
    else if (ele.day == 'wed') return 'Wednesday'
    else if (ele.day == 'thu') return 'Thursday'
    else if (ele.day == 'fri') return 'Friday'
    else if (ele.day == 'sat') return 'Saturday'
    else if (ele.day == 'sun') return 'Sunday'
  }




  const constructTimingArray = (timings) => {
    let timingArray = [];
    for (let i = 0; i < 7; i++) {
      if (timings[i]?.day == defaulFieldsData.timings[i].day) {
        timingArray.push(
          {
            isDayOn: !(timings[i].isClosed),
            day: timings[i].day,
            open24Hours: timings[i].is24HoursOpen,
            printerId: timings[i].printer,
            startTime: moment(timings[i].startTime),
            endTime: moment(timings[i].endTime),
            id: timings[i].id
          }
        )
      } else {
        timingArray.push(defaulFieldsData.timings[i])
      }
    }


    return timingArray;
  }

  const handlePrinterFieldsChange = (evt) => {
    const value = evt?.target?.value;
    let scheduleId;

    // console.log('evt?.target?.value', evt?.target?.value, value === '', 'evt?.target', evt?.target, 'evt', evt);
    if (evt?.target == 'startTime' || evt?.target == 'endTime') {
      let timings = newPrinterFields.timings
      const index = timings.findIndex(obj => {
        scheduleId = obj.id;
        return obj.day === evt?.day;
      });
      if (evt?.target == 'startTime') {

        timings[index].startTime = evt?.startTime
        updateSinglePrinterTime(scheduleId, timings[index])
      }
      else if (evt?.target == 'endTime') {
        timings[index].endTime = evt?.endTime
        updateSinglePrinterTime(scheduleId, timings[index])
      }

      setNewPrinterFields({
        ...newPrinterFields,
        ['timings']: timings
      });

    } else if (evt?.target?.name?.split(' ')[0] == 'is24Hours') {
      let timings = newPrinterFields.timings
      const index = timings.findIndex(obj => {
        scheduleId = obj.id;
        return obj.day === evt?.target?.name?.split(' ')[1];
      });
      timings[index].open24Hours = evt?.target?.value == "false" ? false : true;
      updateSinglePrinterTime(scheduleId, timings[index])

      setNewPrinterFields({
        ...newPrinterFields,
        ['timings']: timings
      });
    } else if (evt?.target?.name?.split(' ')[0] == 'isDayOn') {
      let timings = newPrinterFields.timings
      const index = timings.findIndex(obj => {
        scheduleId = obj.id;
        return obj.day === evt?.target?.name?.split(' ')[1];
      });
      timings[index].isDayOn = evt?.target?.value == "false" ? false : true;
      updateSinglePrinterTime(scheduleId, timings[index])

      setNewPrinterFields({
        ...newPrinterFields,
        ['timings']: timings
      });
    } else {
      setNewPrinterFields({
        ...newPrinterFields,
        ...((value || value === '') ? { [evt?.target?.name]: value } : { printerStatus: evt })
      });
    }
  }

  const updateSinglePrinterTime = (scheduleId, timeObj) => {
    timeObj = {
      printer: selectedPrinterId,
      day: timeObj.day,
      startTime: "2012-06-22 05:40:06",
      endTime: "2012-06-22 05:40:06",
      is24HoursOpen: timeObj.open24Hours,
      isClosed: !timeObj.isDayOn
    }
    var config = {
      method: 'patch',
      url: `${process.env.REACT_APP_BACKEND}/api/printerSchedule/${scheduleId}`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(
        timeObj
      ),
      withCredentials: true,
    };
    axios(config)
      .then((response) => {


      })
      .catch((error) => {
        logAxiosError(error)
      });
  }



  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Container maxW='100%' color={textColor} >
        <SimpleGrid columns={1} gap='20px' mb='20px'>
          <Flex>
            <Spacer />
            <Button
              bg='white'
              _hover={{ bg: "black.300" }}
              onClick={onOpen}>
              Add New
            </Button>
            <PrinterModal
              isNew={isNew}
              isOpen={isOpen}
              // onClose={onClose}
              onClose={modalClose}
              modalHeading={'Add a New Printer'}
              handlePrinterFieldsChange={handlePrinterFieldsChange}
              fetchDayName={fetchDayName}
              newPrinterFields={newPrinterFields}
              setNewPrinterFields={setNewPrinterFields}
              updatePrinter={updatePrinter}
              createPrinter={createPrinter}
              isFirstStep={isFirstStep}
              setIsFirstStep={setIsFirstStep}
              error={error}
            ></PrinterModal>
            <PrinterModal
              isNew={isNew}
              isOpen={isEditOpen}
              onClose={modalClose}
              modalHeading={'Edit Printer'}
              handlePrinterFieldsChange={handlePrinterFieldsChange}
              fetchDayName={fetchDayName}
              newPrinterFields={newPrinterFields}
              setNewPrinterFields={setNewPrinterFields}
              updatePrinter={updatePrinter}
              createPrinter={createPrinter}
              isFirstStep={isFirstStep}
              setIsFirstStep={setIsFirstStep}
              error={error}
            ></PrinterModal>
          </Flex>
          <Flex justify={'space-between'}>
            <HStack>
              <Button
                bg='white'
                _hover={{ bg: "whiteAlpha.900" }}
                minW='36px'

                onClick={() => {
                  sayHello();
                }}>
                All
              </Button>

              <Button
                bg='white'
                _hover={{ bg: "whiteAlpha.900" }}
                minW='36px'

                onClick={() => {
                  sayHello();
                }}>
                Online
              </Button>

              <Button
                bg='white'
                _hover={{ bg: "whiteAlpha.900" }}
                minW='36px'

                onClick={() => {
                  sayHello();
                }}>
                Offline
              </Button>
            </HStack>

            <HStack>
              <Select placeholder='Sort' minW='36px'>
                <option value='option1'>Option 1</option>
                <option value='option2'>Option 2</option>
                <option value='option3'>Option 3</option>
              </Select>
              <InputGroup minW='80px'>
                <Input placeholder='Search' />
                <InputRightAddon>
                  <SearchIcon />
                </InputRightAddon>
              </InputGroup>
            </HStack>

          </Flex>
          <PrinterTable
            columnsData={printerTableColumn}
            tableData={printerTableDataX}
            onEditOpen={fetchSinglePrinterOnEdit}
            handlePageChange={handlePageChange}
            pagesQuantity={11}
          />

        </SimpleGrid>

      </Container>
    </Box>
  );
}
