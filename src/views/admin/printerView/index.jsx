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
  Checkbox,
  Table,
  Tr,
  Td,
  Tbody,
  TableContainer,
  TableCaption,
  Thead,
  Th,
  Tfoot

} from "@chakra-ui/react";
// Assets
import Usa from "assets/img/dashboards/usa.png";
// Custom components
import React, { useEffect, useState } from "react";
// Local Components
import PrinterTable from "views/admin/printers/components/PrinterTable";
import PrinterPaperTable from "views/admin/payments/components/PrinterPaperTable";
import PrinterFormFields from "views/admin/printers/components/PrinterFormFields";
import PrinterModal from "views/admin/printers/components/PrinterModal";
import StatsCard from "components/card/StatsCard"
//Development Data
import {
  printerTableColumn, defaulFieldsData
} from "views/admin/printers/variables/printerTableColumn";
import printerTableData from "views/admin/printers/variables/printerTableData.json";
import {
  printerPaperTableColumn
} from "views/admin/payments/variables/printerPaperTableColumns";
import printerPaperTableData from "views/admin/payments/variables/printerPaperTableData.json";

import 'rc-time-picker/assets/index.css';

import { SearchIcon } from "@chakra-ui/icons";
import PrinterTimingsCard from "./components/PrinterTimingsCard";
import moment from 'moment';
import Card from 'components/card/Card';
import RecentJobsTable from "views/admin/default/components/RecentJobsTable";
import { recentJobsTableColumn } from '../default/variables/recentJobsColumn';
import recentJobsTableData from "views/admin/default/variables/recentJobsTableData.json";
import axios from 'axios';
import { useLocation } from 'react-router-dom';


const format = 'h:mm a';
const now = moment().hour(0).minute(0);

export default function UserReports() {

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
  const [toggleOnline, setToggleOnline] = useState(true)
  const [updatePrinterView, setUpdatePrinterView] = useState(true)

  const printerId = useLocation().state?.printerId;

  console.log('printerId', printerId)  // for location state


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
    setselectedPrinterId(printerId)

    // createPrinterTimings()

    setIsNew(false)
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
        let data = {
          id: response?.data?.id,
          printerName: response?.data?.name,
          printerIp: response?.data?.host,
          printerLocation: response?.data?.address,
          printerCity: response?.data?.city,
          printerStatus: response?.data?.status,
        }
        fetchPrinterTiming(printerId, data)
        setToggleOnline(data.printerStatus == 'Online' ? true : false)
      })
      .catch((error) => {
        logAxiosError(error)
      });
  }, [updatePrinterView]);
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
  const fetchSinglePrinterOnEdit = () => {
    setselectedPrinterId(printerId)

    // createPrinterTimings()

    setIsNew(false)
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
        let data = {
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
        setError(false)
        setIsNew(false)
        // onEditOpen()

      })
      .catch((error) => {
        logAxiosError(error)
      });

  }

  const handlePageChange = () => {
  }
  const modalClose = () => {
    setUpdatePrinterView(!updatePrinterView)
    onEditClose()
    onClose()
    setError('')
    // setNewPrinterFields(defaulFieldsData)


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

    console.log('evt?.target?.value', evt?.target?.value, value === '', 'evt?.target', evt?.target, 'evt', evt);
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
  const updatePrinterStatus = (status, printer) => {
    console.log('status, id', status, printer);

    var config = {
      method: 'patch',
      url: `${process.env.REACT_APP_BACKEND}/api/printers/${printer.id}`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(
        {
          status: status
        }
      ),
      withCredentials: true,
    };
    axios(config)
      .then((response) => {
        let data = {
          printerStatus: response?.data?.status,
        }
        setToggleOnline(!toggleOnline)
      })
      .catch((error) => {
        logAxiosError(error)
      });


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
  const startTime = '9:00 AM'
  const endTime = '10:00 PM'

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <PrinterModal
        isOpen={isEditOpen}
        isNew={isNew}
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
      <Container maxW='100%' color={textColor} >
        <SimpleGrid columns={1} gap='20px' mb='20px'>
          <HStack>
            <HStack>
              <Button
                colorScheme={toggleOnline ? 'green' : 'red'}
                minW='36px'
                isActive={false}
              >
                {toggleOnline ? 'Online' : 'Offline'}
              </Button>
            </HStack>
            <Spacer />
            <HStack>
              <Button
                colorScheme={toggleOnline ? 'red' : 'green'}
                minW='36px'

                onClick={() => {
                  updatePrinterStatus((toggleOnline ? 'Offline' : 'Online'), { id: printerId })
                }}>
                Go {toggleOnline ? 'Offline' : 'Online'}
              </Button>

              <Button
                minW='36px'

                onClick={() => {
                  fetchSinglePrinterOnEdit()
                }}>
                Edit
              </Button>
            </HStack>
          </HStack>
          <Box>
            <Text
              me='auto'
              color={textColor}
              fontSize='xl'
              fontWeight='700'
              lineHeight='100%'
              py={'15px'}
            >
              Toner levels
            </Text>


            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 4, "2xl": 4 }}
              gap='20px'
              mb='20px'>
              <StatsCard
                name='Cyan'
                value='52%'
              />
              <StatsCard
                name='Magenta'
                value='9%'
              />
              <StatsCard
                name='Yellow'
                value='7%'
              />
              <StatsCard

                name='Black'
                value='40%'
              />
            </SimpleGrid>
          </Box>

          <PrinterPaperTable
            columnsData={printerPaperTableColumn}
            tableData={printerPaperTableData}
          />
          <Grid templateColumns='repeat(5, 1fr)' gap={5}>
            <GridItem
              colSpan={3}
            >
              <Text
                me='auto'
                color={textColor}
                fontSize='xl'
                fontWeight='700'
                lineHeight='100%'
                py={'15px'}
              >
                General Information
              </Text>
              <Card
                direction='column'
                w='100%'
                px='0px'
                overflowX={{ sm: "scroll", lg: "hidden" }}>
                <TableContainer >
                  <Table color='gray.500' variant='striped' colorScheme='linkedin'>
                    {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
                    {/* <Thead>
                    <Tr>
                      <Th>To convert</Th>
                      <Th>into</Th>
                      <Th isNumeric>multiply by</Th>
                    </Tr>
                  </Thead> */}
                    <Tbody>
                      <Tr>
                        <Td color={textColor} fontSize='sm' fontWeight='700'>Name</Td>
                        <Td color={textColor} fontSize='sm' fontWeight='700'>{newPrinterFields.printerName}</Td>
                      </Tr>
                      <Tr>
                        <Td color={textColor} fontSize='sm' fontWeight='700'>City</Td>
                        <Td color={textColor} fontSize='sm' fontWeight='700'>{newPrinterFields.printerCity}</Td>
                      </Tr>
                      <Tr>
                        <Td color={textColor} fontSize='sm' fontWeight='700'>Location</Td>
                        <Td color={textColor} fontSize='sm' fontWeight='700'>{newPrinterFields.printerLocation}</Td>
                      </Tr>
                      <Tr>
                        <Td color={textColor} fontSize='sm' fontWeight='700'>Coordinates</Td>
                        <Td color={textColor} fontSize='sm' fontWeight='700'>{newPrinterFields.lat + ", " + newPrinterFields.long}</Td>
                      </Tr>
                      <Tr>
                        <Td color={textColor} fontSize='sm' fontWeight='700'>Host</Td>
                        <Td color={textColor} fontSize='sm' fontWeight='700'>{newPrinterFields.printerIp}</Td>
                      </Tr>
                    </Tbody>
                    {/* <Tfoot>
                    <Tr>
                      <Th>To convert</Th>
                      <Th>into</Th>
                      <Th isNumeric>multiply by</Th>
                    </Tr>
                  </Tfoot> */}
                  </Table>
                </TableContainer>
              </Card>
            </GridItem>
            <GridItem
              colSpan={2}
            >
              <Text
                me='auto'
                color={textColor}
                fontSize='xl'
                fontWeight='700'
                lineHeight='100%'
                py={'15px'}
              >
                Schedule Information
              </Text>
              <Card
                direction='column'
                w='100%'
                px='0px'
                overflowX={{ sm: "scroll", lg: "hidden" }}>
                <TableContainer >
                  <Table color='gray.500' variant='striped' colorScheme='linkedin'>
                    {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
                    {/* <Thead>
                    <Tr>
                      <Th>To convert</Th>
                      <Th>into</Th>
                      <Th isNumeric>multiply by</Th>
                    </Tr>
                  </Thead> */}
                    <Tbody>
                      <Tr>
                        <Td color={textColor} fontSize='sm' fontWeight='700'>Monday</Td>
                        <Td color={textColor} fontSize='sm' fontWeight='700'>{newPrinterFields.timings[0].isDayOn ? `${moment(newPrinterFields.timings[0].startTime, 'ddd DD-MMM-YYYY, hh:mm A').format('hh:mm A')} To ${moment(newPrinterFields.timings[0].endTime, 'ddd DD-MMM-YYYY, hh:mm A').format('hh:mm A')}` : 'Closed'}</Td>
                      </Tr>
                      <Tr>
                        <Td color={textColor} fontSize='sm' fontWeight='700'>Tuesday</Td>
                        <Td color={textColor} fontSize='sm' fontWeight='700'>{newPrinterFields.timings[1].isDayOn ? `${moment(newPrinterFields.timings[1].startTime, 'ddd DD-MMM-YYYY, hh:mm A').format('hh:mm A')} To ${moment(newPrinterFields.timings[1].endTime, 'ddd DD-MMM-YYYY, hh:mm A').format('hh:mm A')}` : 'Closed'}</Td>
                      </Tr>
                      <Tr>
                        <Td color={textColor} fontSize='sm' fontWeight='700'>Wednesday</Td>
                        <Td color={textColor} fontSize='sm' fontWeight='700'>{newPrinterFields.timings[2].isDayOn ? `${moment(newPrinterFields.timings[2].startTime, 'ddd DD-MMM-YYYY, hh:mm A').format('hh:mm A')} To ${moment(newPrinterFields.timings[2].endTime, 'ddd DD-MMM-YYYY, hh:mm A').format('hh:mm A')}` : 'Closed'}</Td>
                      </Tr>
                      <Tr>
                        <Td color={textColor} fontSize='sm' fontWeight='700'>Thursday</Td>
                        <Td color={textColor} fontSize='sm' fontWeight='700'>{newPrinterFields.timings[3].isDayOn ? `${moment(newPrinterFields.timings[3].startTime, 'ddd DD-MMM-YYYY, hh:mm A').format('hh:mm A')} To ${moment(newPrinterFields.timings[3].endTime, 'ddd DD-MMM-YYYY, hh:mm A').format('hh:mm A')}` : 'Closed'}</Td>
                      </Tr>
                      <Tr>
                        <Td color={textColor} fontSize='sm' fontWeight='700'>Friday</Td>
                        <Td color={textColor} fontSize='sm' fontWeight='700'>{newPrinterFields.timings[4].isDayOn ? `${moment(newPrinterFields.timings[4].startTime, 'ddd DD-MMM-YYYY, hh:mm A').format('hh:mm A')} To ${moment(newPrinterFields.timings[4].endTime, 'ddd DD-MMM-YYYY, hh:mm A').format('hh:mm A')}` : 'Closed'}</Td>
                      </Tr>
                      <Tr>
                        <Td color={textColor} fontSize='sm' fontWeight='700'>Saturday</Td>
                        <Td color={textColor} fontSize='sm' fontWeight='700'>{newPrinterFields.timings[5].isDayOn ? `${moment(newPrinterFields.timings[5].startTime, 'ddd DD-MMM-YYYY, hh:mm A').format('hh:mm A')} To ${moment(newPrinterFields.timings[5].endTime, 'ddd DD-MMM-YYYY, hh:mm A').format('hh:mm A')}` : 'Closed'}</Td>
                      </Tr>
                      <Tr>
                        <Td color={textColor} fontSize='sm' fontWeight='700'>Sunday</Td>
                        <Td color={textColor} fontSize='sm' fontWeight='700'>{newPrinterFields.timings[6].isDayOn ? `${moment(newPrinterFields.timings[6].startTime, 'ddd DD-MMM-YYYY, hh:mm A').format('hh:mm A')} To ${moment(newPrinterFields.timings[6].endTime, 'ddd DD-MMM-YYYY, hh:mm A').format('hh:mm A')}` : 'Closed'}</Td>
                      </Tr>
                    </Tbody>
                    {/* <Tfoot>
                    <Tr>
                      <Th>To convert</Th>
                      <Th>into</Th>
                      <Th isNumeric>multiply by</Th>
                    </Tr>
                  </Tfoot> */}
                  </Table>
                </TableContainer>
              </Card>
            </GridItem>
          </Grid>
          <RecentJobsTable
            columnsData={recentJobsTableColumn}
            tableData={recentJobsTableData}
          />

        </SimpleGrid>

      </Container>
    </Box>
  );
}
