import React from 'react';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import VideocamIcon from '@material-ui/icons/Videocam';
import LanguageIcon from '@material-ui/icons/Language';
import ControlCameraIcon from '@material-ui/icons/ControlCamera';
import CategoryIcon from '@material-ui/icons/Category';
import MovieFilterIcon from '@material-ui/icons/MovieFilter';
import DateRangeIcon from '@material-ui/icons/DateRange';
import EventNoteIcon from '@material-ui/icons/EventNote';
import { v4 as uuid } from 'uuid';
import StopRoundedIcon from '@material-ui/icons/StopRounded';

export const navbarItem = [
  {
    link: 'Home',
    params: 'home',
    icon: <HomeOutlinedIcon />,
    id: uuid(),
  },
  {
    link: 'CP',
    params: 'CP',

    icon: <VideocamIcon />,
    id: uuid(),
    subLink: [
      { link: 'CP Present Condition', params: 'CP.cp_present_condition' },
    ],
  },
  {
    link: 'Store',
    params: 'store',

    icon: <LanguageIcon />,
    id: uuid(),
    subLink: [
      {
        link: 'Store Present Condition',
        params: 'store.store_present_condition',
      },
    ],
  },
  {
    link: 'Machine',
    params: 'machine',

    icon: <ControlCameraIcon />,
    id: uuid(),
    subLink: null,
  },
  {
    link: 'Category',
    params: 'category',

    icon: <CategoryIcon />,
    id: uuid(),
    subLink: null,
  },
  {
    link: 'Content',
    params: 'content',

    icon: <MovieFilterIcon />,
    id: uuid(),
    subLink: null,
  },
  {
    link: 'Program Table',
    params: 'program_table',
    icon: <EventNoteIcon />,
    id: uuid(),
    subLink: null,
  },
  {
    link: 'App User',
    params: 'appuser',

    icon: <DateRangeIcon />,
    id: uuid(),
    subLink: null,
  },
  {
    link: 'App Manage',
    params: 'appmanage',
    icon: <DateRangeIcon />,
    id: uuid(),
    subLink: [
      {
        link: 'Event Banner',
        params: 'appmanage.event_banner',
        icon: <StopRoundedIcon />,
      },
      { link: 'Notice', params: 'appmanage.notice', icon: <StopRoundedIcon /> },
      { link: 'Artist', params: 'appmanage.artist', icon: <StopRoundedIcon /> },
    ],
  },
  {
    link: 'Asset Upload',
    params: 'asset_upload',

    icon: <DateRangeIcon />,
    id: uuid(),
    subLink: ['Asset VOD', 'Asset Image', 'Asset File'],
    subLink: [
      { link: 'Asset VOD', params: 'asset_upload.event_banner' },
      { link: 'Asset Image', params: 'asset_upload.asset_image' },
      { link: 'Asset File', params: 'asset_upload.asset_file' },
    ],
  },
  {
    link: 'Statistics',
    params: 'statistics',

    icon: <DateRangeIcon />,
    id: uuid(),

    subLink: [
      { link: 'Rank', params: 'statistics.rank', icon: <StopRoundedIcon /> },
      {
        link: 'Login Statistics',
        params: 'statistics.login_statistics',
        icon: <StopRoundedIcon />,
      },
      {
        link: 'Content Statistics',
        params: 'statistics.content_statistics',
        icon: <StopRoundedIcon />,
      },
    ],
  },
  {
    link: 'Log Manage',
    params: 'logmanage',

    icon: <DateRangeIcon />,
    id: uuid(),
    subLink: null,
  },
  {
    link: 'Administration',
    params: 'administration',

    icon: <DateRangeIcon />,
    id: uuid(),
    subLink: null,
  },
];

export const artistList = [
  '우주소녀',
  '빅뱅',
  '트와이스',
  '블랙핑크',
  '걸스데이',
  '여자친구',
  '에이핑크',
];

export const genreList = [
  '엔터테인먼트',
  '호러',
  '슈팅',
  '스포츠',
  '교육',
  '여행',
  '자연',
];

export const cpSelectlist = ['title', 'name', 'phone', 'address1', 'email'];
export const cpNotSelectlist = [
  'workspace_id',
  'address2',
  'type',
  'ceo',
  'companyno',
];

export const allCNInCategory = [
  { name: 'title', fetch: true },
  { name: 'priority', fetch: true },
  { name: 'genre_list', fetch: true },
  { name: 'usageyn', fetch: true },
  { name: 'workspace_id', fetch: false },
  { name: 'assetimage_id', fetch: false },
  { name: 'created', fetch: false },
  { name: 'created_by', fetch: false },
  { name: 'updated', false: false },
  { name: 'updated_by', false: false },
];

const string =
  'WORKSPACE_ID ID NAME TYPE  CEO COMPANYNO MANAGER PHONE FAX EMAIL ADDRESS1 ADDRESS2 MAJORCOMMENT CONTRACTDATE1 CONTRACTDATE2 PROFITRATE CREATED CREATED_BY UPDATED UPDATED_BY';

const formatString = (string) => {
  const arr = string.toLowerCase().split(' ');
  const formattedArr = arr.reduce((acc, value) => {
    return [...acc, { name: value, fetch: false }];
  }, []);
  console.log(formattedArr, 'formattedArr');
};

formatString(string);
export const allCNInCP = [
  { name: 'title', fetch: true },
  { name: 'name', fetch: true },
  { name: 'type', fetch: false },
  { name: 'ceo', fetch: false },
  { name: 'companyno', fetch: false },
  { name: 'manager', fetch: false },
  { name: 'phone', fetch: true },
  { name: 'fax', fetch: false },
  { name: 'email', fetch: true },
  { name: 'address1', fetch: true },
  { name: 'address2', fetch: false },
  { name: 'majorcomment', fetch: false },
  { name: 'contractdate1', fetch: false },
  { name: 'contractdate2', fetch: false },
  { name: 'profitrate', fetch: false },
  { name: 'created', fetch: false },
  { name: 'created_by', fetch: false },
  { name: 'updated', fetch: false },
  { name: 'updated_by', fetch: false },
  { name: 'workspace_id', fetch: false },
];

export const allCNinStore = [
  { name: 'name', fetch: true },
  { name: 'workspace_id', fetch: false },
  { name: 'type', fetch: false },
  { name: 'ceo', fetch: false },
  { name: 'companyno', fetch: true },
  { name: 'manager', fetch: false },
  { name: 'phone', fetch: true },
  { name: 'fax', fetch: false },
  { name: 'email', fetch: true },
  { name: 'address1', fetch: true },
  { name: 'address2', fetch: false },
  { name: 'majorcomment', fetch: false },
  { name: 'contractdate1', fetch: false },
  { name: 'contractdate2', fetch: false },
  { name: 'profitrate', fetch: false },
  { name: 'created', fetch: false },
  { name: 'created_by', fetch: false },
  { name: 'updated', fetch: false },
  { name: 'updated_by', fetch: false },
];
