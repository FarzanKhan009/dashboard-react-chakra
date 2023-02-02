import moment from 'moment';
const currentTime = moment();

export const printerTableColumn = [
  {
    Header: "SystemID",
    accessor: "id",
  },
  {
    Header: "Printer ID",
    accessor: "printerId",
  },
  {
    Header: "Location",
    accessor: "address",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Action",
    accessor: "action",
  }
];



export const defaulFieldsData = {
  printerName: "",
  printerIp: "",
  printerLocation: "",
  printerCity: "",
  printerStatus: "",
  lat: "1.7777",
  long: "1.66666",
  timings:
    [
      {
        isNewRecod: true,
        isDayOn: false,
        day: 'Monday',
        open24Hours: false,
        startTime: currentTime,
        endTime: currentTime
      },
      {
        isNewRecod: true,
        isDayOn: false,
        day: 'Tuesday',
        open24Hours: false,
        startTime: currentTime,
        endTime: currentTime
      },
      {
        isNewRecod: true,
        isDayOn: false,
        day: 'Wednesday',
        open24Hours: false,
        startTime: currentTime,
        endTime: currentTime
      },
      {
        isNewRecod: true,
        isDayOn: false,
        day: 'Thursday',
        open24Hours: false,
        startTime: currentTime,
        endTime: currentTime
      },
      {
        isNewRecod: true,
        isDayOn: false,
        day: 'Friday',
        open24Hours: false,
        startTime: currentTime,
        endTime: currentTime
      },
      {
        isNewRecod: true,
        isDayOn: false,
        day: 'Saturday',
        open24Hours: false,
        startTime: currentTime,
        endTime: currentTime
      },
      {
        isNewRecod: true,
        isDayOn: false,
        day: 'Sunday',
        open24Hours: false,
        startTime: currentTime,
        endTime: currentTime
      },
    ]
}