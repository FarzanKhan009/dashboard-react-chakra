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
import React, { useState } from "react";
// Local Components
import PrinterTable from "views/admin/printers/components/PrinterTable";
import PrinterPaperTable from "views/admin/payments/components/PrinterPaperTable";
import PrinterFormFields from "views/admin/printers/components/PrinterFormFields";
import PrinterModal from "views/admin/printers/components/PrinterModal";
import StatsCard from "components/card/StatsCard"
//Development Data
import {
  printerTableColumn
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

const format = 'h:mm a';
const now = moment().hour(0).minute(0);

export default function UserReports() {
  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const textColor = useColorModeValue("secondaryGray.900", "white");
  let index = 1
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure()

  const currentTime = moment();
  const sayHello = () => {

    alert("clicked")
  }
  const [toggleOnline, setToggleOnline] = useState('true')

  const [newPrinterFields, setNewPrinterFields] = React.useState({
    printerName: "",
    printerIp: "",
    printerLocation: "",
    printerCity: "",
    printerStatus: "",
    status: "",
    timings:
      [
        {
          isDayOn: false,
          day: 'mon',
          open24Hours: false,
          startTime: currentTime,
          endTime: currentTime
        },
        {
          isDayOn: false,
          day: 'tue',
          open24Hours: false,
          startTime: currentTime,
          endTime: currentTime
        },
        {
          isDayOn: false,
          day: 'wed',
          open24Hours: false,
          startTime: currentTime,
          endTime: currentTime
        },
        {
          isDayOn: false,
          day: 'thu',
          open24Hours: false,
          startTime: currentTime,
          endTime: currentTime
        },
        {
          isDayOn: false,
          day: 'fri',
          open24Hours: false,
          startTime: currentTime,
          endTime: currentTime
        },
        {
          isDayOn: false,
          day: 'sat',
          open24Hours: false,
          startTime: currentTime,
          endTime: currentTime
        },
        {
          isDayOn: false,
          day: 'sun',
          open24Hours: false,
          startTime: currentTime,
          endTime: currentTime
        },
      ]
  })
  const fetchDayName = (ele) => {
    if (ele.day == 'mon') return 'Monday'
    else if (ele.day == 'tue') return 'Tuesday'
    else if (ele.day == 'wed') return 'Wednesday'
    else if (ele.day == 'thu') return 'Thursday'
    else if (ele.day == 'fri') return 'Friday'
    else if (ele.day == 'sat') return 'Saturday'
    else if (ele.day == 'sun') return 'Sunday'
  }

  // const isError = (e) => {
  //   console.log('change', e);
  //   return (e !== '' ? true : false)
  // }
  const handlePrinterFieldsChange = (evt) => {
    const value = evt?.target?.value;
    // console.log('evt.target.name', evt?.target?.name, evt?.value, evt?.target);

    if (evt?.target == 'startTime' || evt?.target == 'endTime') {
      let timings = newPrinterFields.timings
      const index = timings.findIndex(obj => {
        return obj.day === evt?.day;
      });
      if (evt?.target == 'startTime')
        timings[index].startTime = evt?.startTime
      else if (evt?.target == 'endTime')
        timings[index].endTime = evt?.endTime

      setNewPrinterFields({
        ...newPrinterFields,
        ['timings']: timings
      });

    } else if (evt?.target?.name?.split(' ')[0] == 'is24Hours') {
      let timings = newPrinterFields.timings
      const index = timings.findIndex(obj => {
        return obj.day === evt?.target?.name?.split(' ')[1];
      });
      timings[index].open24Hours = evt?.target?.value == "false" ? false : true;

      setNewPrinterFields({
        ...newPrinterFields,
        ['timings']: timings
      });
    } else if (evt?.target?.name?.split(' ')[0] == 'isDayOn') {
      let timings = newPrinterFields.timings
      const index = timings.findIndex(obj => {
        return obj.day === evt?.target?.name?.split(' ')[1];
      });
      timings[index].isDayOn = evt?.target?.value == "false" ? false : true;

      setNewPrinterFields({
        ...newPrinterFields,
        ['timings']: timings
      });
    } else {
      setNewPrinterFields({
        ...newPrinterFields,
        [evt?.target?.name]: value
      });
    }
  }

  const startTime = '9:00 AM'
  const endTime = '10:00 PM'

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <PrinterModal
        isOpen={isEditOpen}
        onClose={onEditClose}
        modalHeading={'Edit Printer'}
        handlePrinterFieldsChange={handlePrinterFieldsChange}
        fetchDayName={fetchDayName}
        newPrinterFields={newPrinterFields}
        setNewPrinterFields={setNewPrinterFields}
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
                  setToggleOnline(!toggleOnline)
                }}>
                Go {toggleOnline ? 'Offline' : 'Online'}
              </Button>

              <Button
                minW='36px'

                onClick={() => {
                  onEditOpen()
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
                  <Table variant='simple' color='gray.500' mb='24px'>
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
                        <Td color={textColor} fontSize='sm' fontWeight='700'>ABC</Td>
                      </Tr>
                      <Tr>
                        <Td color={textColor} fontSize='sm' fontWeight='700'>City</Td>
                        <Td color={textColor} fontSize='sm' fontWeight='700'>Lahore</Td>
                      </Tr>
                      <Tr>
                        <Td color={textColor} fontSize='sm' fontWeight='700'>Location</Td>
                        <Td color={textColor} fontSize='sm' fontWeight='700'>Pakistan</Td>
                      </Tr>
                      <Tr>
                        <Td color={textColor} fontSize='sm' fontWeight='700'>Coordinates</Td>
                        <Td color={textColor} fontSize='sm' fontWeight='700'>1.7777,1.6222</Td>
                      </Tr>
                      <Tr>
                        <Td color={textColor} fontSize='sm' fontWeight='700'>Host</Td>
                        <Td color={textColor} fontSize='sm' fontWeight='700'>192.168.10.2</Td>
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
                  <Table variant='simple' color='gray.500' mb='24px'>
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
                        <Td color={textColor} fontSize='sm' fontWeight='700'>{startTime} To {endTime}</Td>
                      </Tr>
                      <Tr>
                        <Td color={textColor} fontSize='sm' fontWeight='700'>Tuesday</Td>
                        <Td color={textColor} fontSize='sm' fontWeight='700'>{startTime} To {endTime}</Td>
                      </Tr>
                      <Tr>
                        <Td color={textColor} fontSize='sm' fontWeight='700'>Wednesday</Td>
                        <Td color={textColor} fontSize='sm' fontWeight='700'>{startTime} To {endTime}</Td>
                      </Tr>
                      <Tr>
                        <Td color={textColor} fontSize='sm' fontWeight='700'>Thursday</Td>
                        <Td color={textColor} fontSize='sm' fontWeight='700'>{startTime} To {endTime}</Td>
                      </Tr>
                      <Tr>
                        <Td color={textColor} fontSize='sm' fontWeight='700'>Friday</Td>
                        <Td color={textColor} fontSize='sm' fontWeight='700'>Closed</Td>
                      </Tr>
                      <Tr>
                        <Td color={textColor} fontSize='sm' fontWeight='700'>Saturday</Td>
                        <Td color={textColor} fontSize='sm' fontWeight='700'>{startTime} To {endTime}</Td>
                      </Tr>
                      <Tr>
                        <Td color={textColor} fontSize='sm' fontWeight='700'>Sunday</Td>
                        <Td color={textColor} fontSize='sm' fontWeight='700'>{startTime} To {endTime}</Td>
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

          <Card>
            <RecentJobsTable
              columnsData={recentJobsTableColumn}
              tableData={recentJobsTableData}
            />
          </Card>

        </SimpleGrid>

      </Container>
    </Box>
  );
}
