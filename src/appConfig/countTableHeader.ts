import { HeaderList } from 'src/components/CountTable';

export type DataSCHEDULE_A = {
  year: number | string;
  industry: number;
  office: number;
  other: number;
  tool: number;
  pc: number;
  internet: number;
};

export type DataSCHEDULE_B = {
  year: number | string;
  industry: number;
  office: number;
  other: number;
  tool: number;
};

export const headerListSCHEDULE_A: HeaderList = [
  [
    {
      title: 'CALENDAR YEAR OF ACQUISITION',
      rowSpan: 1,
      colSpan: 1,
    },
    {
      title: 'MACHINERY AND EQUIPMENT FOR INDUSTRY, PROFESSION, OR TRADE',
      rowSpan: 1,
      colSpan: 1,
    },
    {
      title: 'OFFICE FURNITURE AND EQUIPMENT',
      rowSpan: 1,
      colSpan: 1,
    },
    {
      title: 'OTHER EQUIPMENT',
      rowSpan: 1,
      colSpan: 1,
    },
    {
      title: 'TOOLS, MOLDS, DIES, JIGS',
      rowSpan: 1,
      colSpan: 1,
    },
    {
      title: 'PERSONAL COMPUTERS',
      rowSpan: 1,
      colSpan: 1,
    },
    {
      title: 'LOCAL AREA NETWORK (LAN) EQUIPMENT AND MAINFRAMES',
      rowSpan: 1,
      colSpan: 1,
    },
  ],
];

export const headerListSCHEDULE_B: HeaderList = [
  [
    {
      title: 'CALENDAR YEAR OF ACQUISITION',
      rowSpan: 2,
      colSpan: 1,
    },
    {
      title: 'BUILDINGS, BUILDING IMPROVEMENTS, AND/OR LEASEHOLD IMPROVEMENTS',
      rowSpan: 1,
      colSpan: 2,
    },
    {
      title: 'LAND IMPROVEMENTS',
      subTitle: '(e.g., blacktop, curbs, fences)',
      rowSpan: 2,
      colSpan: 1,
    },
    {
      title: 'LAND AND LAND DEVELOPMENT',
      subTitle: '(e.g., fill, grading)',
      rowSpan: 2,
      colSpan: 1,
    },
  ],
  [
    {
      title: 'STRUCTURE ITEMS ONLY',
      subTitle: '(see instructions)',
      rowSpan: 1,
      colSpan: 1,
    },
    {
      title: 'FIXTURES ONLY',
      subTitle: '(see instructions)',
      rowSpan: 1,
      colSpan: 1,
    },
  ],
];

export const dataA: DataSCHEDULE_A[] = [
  {
    year: 2020,
    industry: 32292220,
    office: 490510,
    other: 275403,
    tool: 219708,
    pc: 406270,
    internet: 928415,
  },
  {
    year: 2019,
    industry: 32292220,
    office: 490510,
    other: 275403,
    tool: 219708,
    pc: 406270,
    internet: 928415,
  },
  {
    year: 2018,
    industry: 32292220,
    office: 490510,
    other: 275403,
    tool: 219708,
    pc: 406270,
    internet: 928415,
  },
  {
    year: 2017,
    industry: 32292220,
    office: 490510,
    other: 275403,
    tool: 219708,
    pc: 406270,
    internet: 928415,
  },
  {
    year: 2016,
    industry: 32292220,
    office: 490510,
    other: 275403,
    tool: 219708,
    pc: 406270,
    internet: 928415,
  },
  {
    year: 2015,
    industry: 32292220,
    office: 490510,
    other: 275403,
    tool: 219708,
    pc: 406270,
    internet: 928415,
  },
  {
    year: 'Prior',
    industry: 32292220,
    office: 490510,
    other: 275403,
    tool: 219708,
    pc: 406270,
    internet: 928415,
  },
];

export const dataB: DataSCHEDULE_B[] = [
  {
    year: 2020,
    industry: 32292220,
    office: 490510,
    other: 275403,
    tool: 219708,
  },
  {
    year: 2019,
    industry: 32292220,
    office: 490510,
    other: 275403,
    tool: 219708,
  },
  {
    year: 2018,
    industry: 32292220,
    office: 490510,
    other: 275403,
    tool: 219708,
  },
  {
    year: 2017,
    industry: 32292220,
    office: 490510,
    other: 275403,
    tool: 219708,
  },
  {
    year: 2016,
    industry: 32292220,
    office: 490510,
    other: 275403,
    tool: 219708,
  },
  {
    year: 2015,
    industry: 32292220,
    office: 490510,
    other: 275403,
    tool: 219708,
  },
  {
    year: 'Prior',
    industry: 32292220,
    office: 490510,
    other: 275403,
    tool: 219708,
  },
];
