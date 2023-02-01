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
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React from "react";
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
} from "react-icons/md";
import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import PieCard from "views/admin/default/components/PieCard";
import UsersCard from "views/admin/default/components/UsersStats";
import FinanceCard from "views/admin/default/components/FinanceStats";
import StatsCard from "views/admin/default/components/StatsCard";
import RecentJobsTable from "views/admin/default/components/RecentJobsTable";
import Tasks from "views/admin/default/components/Tasks";
import TotalSpent from "views/admin/default/components/TotalSpent";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import {
  columnsDataCheck,
  columnsDataComplex,
} from "views/admin/default/variables/columnsData";
import {
  recentJobsTableColumn
} from "views/admin/default/variables/recentJobsColumn";
import recentJobsTableData from "views/admin/default/variables/recentJobsTableData.json";

import tableDataCheck from "views/admin/default/variables/tableDataCheck.json";
import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";

export default function UserReports() {
  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const textColor = useColorModeValue("secondaryGray.900", "white");

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      {/* <Container maxW='100%' color={textColor} >
        <Text
          me='auto'
          color={textColor}
          fontSize='xl'
          fontWeight='700'
          lineHeight='100%'
          py={'15px'}
        >
          Platform Stats
        </Text>


        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3, "2xl": 5 }}
          gap='20px'
          mb='20px'>
          <StatsCard
            name='New Signups'
            value='52'
          />
          <StatsCard
            name='Confirmed Users'
            value='9'
          />
          <StatsCard
            name='Pending Users'
            value='7'
          />
          <StatsCard

            name='Pending Users'
            value='7'
          />
          <StatsCard
            name='Blocked Users'
            value='6'
          />
          <StatsCard
            name='Revenue'
            value='$2935'
          />
          <StatsCard
            name='Fees'
            value='$2935'
          />
          <StatsCard
            name='Total Jobs'
            value='50'
          />
          <StatsCard
            name='Completed Jobs'
            value='48'
          />
          <StatsCard
            name='Failed Jobs'
            value='2'
          />
        </SimpleGrid>
      </Container>

      <Container maxW='100%' color={textColor} >
        <Text
          me='auto'
          color={textColor}
          fontSize='xl'
          fontWeight='700'
          lineHeight='100%'
          py={'15px'}
        >
          Printers Stats
        </Text>


        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3, "2xl": 5 }}
          gap='20px'
          mb='20px'>
          <StatsCard
            name='Total Printers'
            value='60'
          />
          <StatsCard
            name='Live Printers'
            value='50'
          />
          <StatsCard
            name='Offline Printers'
            value='10'
          />
          <StatsCard
            name='Low on Ink'
            value='15'
          />
          <StatsCard
            name='Low on Paper'
            value='10'
          />
        </SimpleGrid>
      </Container>

      <Container maxW='100%' color={textColor} >
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
          <UsersCard />
          <FinanceCard />
        </SimpleGrid>
      </Container>

      <Container maxW='100%' color={textColor} >
        <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap='20px' mb='20px'>
          <RecentJobsTable
            columnsData={recentJobsTableColumn}
            tableData={recentJobsTableData}
          />
        </SimpleGrid>

      </Container> */}


      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
        <TotalSpent />
        <WeeklyRevenue />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
        <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} />
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
          <DailyTraffic />
          <PieCard />
        </SimpleGrid>
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
          <Tasks />
          <MiniCalendar h='100%' minW='100%' selectRange={false} />
        </SimpleGrid>
      </SimpleGrid>
    </Box>
  );
}
