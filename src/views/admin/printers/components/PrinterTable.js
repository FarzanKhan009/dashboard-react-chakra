import {
  Flex,
  Table,
  Progress,
  Icon,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  HStack,
  Tooltip,
  IconButton,
} from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

import {
  Previous,
  Paginator,
  PageGroup,
  Page,
  Next,
  generatePages
} from 'chakra-paginator';

// Custom components
import Card from "components/card/Card";

// Assets
import { EditIcon, ViewIcon } from "@chakra-ui/icons";
import { IoPower } from "react-icons/io5";
import { useHistory } from "react-router-dom";

export default function ColumnsTable(props) {
  const { columnsData, tableData, onEditOpen } = props;
  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);
  const [toggleOnOff, setToggleOnOff] = useState('true')

  const history = useHistory()


  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 100;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  return (
    <Card
      direction='column'
      w='100%'
      px='0px'
      overflowX={{ sm: "scroll", lg: "hidden" }}>
      <Table {...getTableProps()} variant='simple' color='gray.500' mb='24px'>
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  pe='10px'
                  key={index}
                  borderColor={borderColor}>
                  <Flex
                    justify='space-between'
                    align='center'
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color='gray.400'>
                    {column.render("Header")}
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()} key={index}>
                {row.cells.map((cell, index) => {
                  let data = "";
                  if (cell.column.Header === "SystemID") {
                    data = (
                      <Text color={textColor} fontSize='sm' fontWeight='700'>
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "Printer ID") {
                    data = (
                      <Flex align='center'>
                        <Text color={textColor} fontSize='sm' fontWeight='700'>
                          {cell.value}
                        </Text>
                      </Flex>
                    );
                  } else if (cell.column.Header === "Location") {
                    data = (
                      <Text color={textColor} fontSize='sm' fontWeight='700'>
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "Status") {
                    data = (
                      <Text color={textColor} fontSize='sm' fontWeight='700'>
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "Action") {
                    data = (
                      <HStack>
                        <Tooltip label='View this printer.' hasArrow bg='gray.300' color='black' size={'50px'}>
                          <IconButton
                            onClick={() => {
                              history.push('/admin/printerView')

                            }}
                            colorScheme='blue'
                            icon={<ViewIcon />}
                          />


                        </Tooltip>
                        <Tooltip label='Edit this printer.' hasArrow bg='gray.300' color='black' size={'50px'}>
                          <IconButton
                            onClick={() => {
                              onEditOpen(row.values.id)
                            }}
                            colorScheme='blue'
                            icon={<EditIcon />}
                          />

                        </Tooltip>
                        <Tooltip label={toggleOnOff ? 'Turn Off' : 'Turn on'} hasArrow bg='gray.300' color='black' size={'50px'}>
                          <span>
                            <IconButton
                              onClick={() => {
                                setToggleOnOff(!toggleOnOff)
                              }
                              }
                              colorScheme='blue'
                              icon={<IoPower />}
                            />
                            {/* <IoPower boxSize={50} color={toggleOnOff ? 'green' : 'red'} onClick={() => {
                              setToggleOnOff(!toggleOnOff)
                            }
                            } /> */}
                          </span>
                        </Tooltip>
                      </HStack>
                    );
                  }
                  return (
                    <Td
                      {...cell.getCellProps()}
                      key={index}
                      fontSize={{ sm: "14px" }}
                      maxH='30px !important'
                      py='8px'
                      minW={{ sm: "150px", md: "200px", lg: "auto" }}
                      borderColor='transparent'>
                      {data}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Card>
  );
}
