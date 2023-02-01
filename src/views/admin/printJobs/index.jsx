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
  Container
} from "@chakra-ui/react";
// Assets
import Usa from "assets/img/dashboards/usa.png";
// Custom components
import React from "react";
import PrinterTable from "views/admin/printJobs/components/PrintJobsTable";
import {
  printerTableColumn
} from "views/admin/printJobs/variables/printJobsTableColumn";
import printerTableData from "views/admin/printJobs/variables/printJobsTableData";

export default function UserReports() {
  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const textColor = useColorModeValue("secondaryGray.900", "white");

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Container maxW='100%' color={textColor} >
        <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap='20px' mb='20px'>
          <PrinterTable
            columnsData={printerTableColumn}
            tableData={printerTableData}
          />
        </SimpleGrid>
      </Container>
    </Box>
  );
}
