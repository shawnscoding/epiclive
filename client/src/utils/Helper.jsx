import React from 'react';
import CategoryForm from './../component/form/CategoryForm';
import AppUserForm from '../component/form/AppUserForm';
import TableSearch from '../component/main/tableSearch/TableSearch.jsx';
import AssetInput from './../component/main/assetInput/AssetInput';
import Rank from './../component/main/rank/Rank';

import CPform from './../component/form/CPform';
import ContentForm from './../component/contentFormSteps/index';

import { disabled } from '../styled-component/Variable';
import {
  StdArrowDropUpIcon,
  StdArrowDropDownIcon,
} from './../styled-component/Icons';
import DetailedPage from './../component/main/detailedPagwe/DetailedPage';
import { Grid } from '@material-ui/core/';
import { Text } from '../styled-component/Text';
import { GridWithMargin } from './../styled-component/Layout';
import { allCNInCategory, allCNInCP, allCNinStore } from './Data';

// this is for sort state
export const checkHasSort = (sort, category) => {
  if (sort.column === '') {
    const defaultColumn = getCNByCategory(category);
    sort.column = defaultColumn;
  }

  console.log(sort, 'sortby');
  return sort;
};
export const getCNByCategory = (category) => {
  switch (category) {
    case 'category':
      return allCNInCategory[0].name;
    case 'CP':
      return allCNInCP[0].name;
    case 'store':
      return allCNinStore[0].name;
    default:
      return;
  }
};

// this is for column filtering
export const getLeftMaintist = (category) => {
  switch (category) {
    case 'category':
      return mapNotSelectCNList(allCNInCategory);
    case 'CP':
      return mapNotSelectCNList(allCNInCP);
    case 'store':
      return mapNotSelectCNList(allCNinStore);
    default:
      return;
  }
};

export const getRightMainList = (category) => {
  switch (category) {
    case 'category':
      return mapSelectCNList(allCNInCategory);
    case 'CP':
      return mapSelectCNList(allCNInCP);
    case 'store':
      return mapSelectCNList(allCNinStore);
    default:
      return;
  }
};

const mapNotSelectCNList = (cns) => {
  return cns.filter((cn) => !cn.fetch).map((cn) => cn.name);
};

const mapSelectCNList = (cns) => {
  return cns.filter((cn) => cn.fetch).map((cn) => cn.name);
};
// this is for column filtering

// render CN for SortModal

export const renderCNinSortModal = (category) => {
  switch (category) {
    case 'category':
      return allCNInCategory;
    case 'CP':
      return allCNInCP;
    case 'store':
      return allCNinStore;
    default:
      return;
  }
};

//

// alter when number of columns has changed

export const checkFileType = (type) => {
  switch (type) {
    case 'image/png':
    case 'image/jpg':
    case 'image/jpeg':
      return 'image';
    case 'video/mp4':
      return 'video';
    case 'text/plain':
    case 'application/msword':
      return 'file';
    default:
      return;
  }
};

export const renderMain = (category) => {
  switch (category) {
    case 'category':
    case 'CP':
    case 'store':
    case 'appuser':
    case 'program_table':
    case 'content':
    case 'asset_upload.asset_image':
    case 'asset_upload.asset_file':
      return <TableSearch />;
    case 'asset_upload':
      return <AssetInput category={category} />;
    case 'statistics.rank':
      return <Rank category={category} />;
    case 'content.details':
      return <DetailedPage category={category} />;
    default:
      return;
  }
};

// !! fix appuserform
export const renderForm = (props) => {
  const { category } = props;
  switch (category) {
    case 'category':
      return <CategoryForm {...props} />;
    case 'appuser':
      return <AppUserForm {...props} />;
    case 'content':
      return <ContentForm {...props} />;
    case 'CP':
      return <CPform {...props} />;
    default:
      return;
  }
};

// $$  prior approach
// removed !!

export const renderArrWithOutIdNormal = (arr) => {
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].name !== 'id') {
      res.push(arr[i].name);
    }
  }

  return res.map((a) => <th key={Math.random()}>{a}</th>);
};
// $$ new approach, more clean less code
export const renderArrWithOutId = (arr, handleSearchSubmitWithSort, sort) => {
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].name !== 'id') {
      res.push(arr[i].name);
    }
  }

  if (sort === null) {
    return res.map((name) => (
      <th key={name}>
        {name}
        <StdArrowDropDownIcon
          onClick={() => handleSearchSubmitWithSort(name, 'ascending')}
          notactive={disabled}
        />
      </th>
    ));
  } else {
    return res.map((name) => {
      if (sort.column !== name) {
        return (
          <th key={name}>
            {name}
            <StdArrowDropDownIcon
              onClick={() => handleSearchSubmitWithSort(name, 'ascending')}
              notactive={disabled}
            />
          </th>
        );
      } else if (sort.direction === 'ascending') {
        return (
          <th key={name}>
            {name}
            <StdArrowDropDownIcon
              onClick={() => handleSearchSubmitWithSort(name, 'descending')}
            />
          </th>
        );
      } else if (sort.direction === 'descending') {
        return (
          <th key={name}>
            {name}
            <StdArrowDropUpIcon
              onClick={() => handleSearchSubmitWithSort(name, 'ascending')}
            />
          </th>
        );
      }
    });
  }
};

export const renderObjWithOutId = (obj) => {
  let res = [];

  for (const key in obj) {
    if (key !== 'id' && key !== 'checked') {
      res.push(obj[key]);
    }
  }

  return res.map((a, index) => <td key={index}>{a}</td>);
};

export const renderObjWithOutIdInDetailsPage = (obj) => {
  let res = [];

  for (const key in obj) {
    if (key !== 'id' && key !== 'checked') {
      res.push({ key: key, value: obj[key] });
    }
  }

  return res.map((a, index) => (
    <GridWithMargin key={index} container>
      <Grid item xs={3}>
        <Text uppercase='uppercase' sz='1.5rem'>
          {a.key} :
        </Text>
      </Grid>
      <Grid item xs={9}>
        <Text uppercase='uppercase' sz='1.5rem'>
          {a.value}
        </Text>
      </Grid>
    </GridWithMargin>
  ));
};

export const renderCells = (clLength) => {
  switch (clLength) {
    case 8:
      return `repeat(8, 1fr)`;
    case 7:
      return `repeat(7, 1fr)`;
    case 6:
      return `repeat(6, 1fr)`;
    case 5:
      return `repeat(5, 1fr)`;
    case 4:
      return `repeat(4, 1fr)`;
    case 3:
      return `repeat(3, 1fr)`;
    case 2:
      return `repeat(2, 1fr)`;
    default:
      return;
  }
};

// @@ used in createmodal
export const getFormFields = (category) => {
  switch (category) {
    case 'category':
      return createFormOfCategory;
    case 'CP':
      return createFormOfCP;

    case 'store':
      return createFormOfStore;
    case 'appuser':
      return appUserForm;
    case 'content':
      return createFormOfContent;

    default:
      return;
  }
};

export const getSearchBarTitle = (category) => {
  switch (category) {
    case 'category':
      return 'Title';
    case 'CP':
      return 'Title';
    case 'store':
      return 'Title';
    case 'appuser':
      return 'Username';
    case 'content':
      return 'Title';
    case 'program_table':
      return 'Date';

    default:
      return;
  }
};

// @@ desc display on search bar and under the table
// and use in saga to check  how many columns user wanna see

export const mapColumnNamesForFilter = (columnNames) => {
  if (!columnNames) return;
  for (let i = 0; i < columnNames.length; i++) {
    columnNames[i].fetch = false;
  }

  return columnNames;
};

// these are used as formfields for create record fn
// this order is important for getting record in order after inserting
const createFormOfCategory = {
  title: '',
  genre_list: '',
  priority: '',
  usageyn: '',
};

// omitted password, avatar_index

const appUserForm = {
  username: '',
  account: '',
  password: '',
  password_check: '',
  status: '',
  sex: '',
  tag: '',
};

const createFormOfCP = {
  title: '',
  name: '',
  phone: '',
  email: '',
  address1: '',
};

const createFormOfStore = {
  name: '',
  companyno: '',
  phone: '',
  email: '',
  address1: '',
};

const createFormOfContent = {
  lang: '',
  // select
  title: '',
  category_id: '',
  // need to search category field
  artist_list: '',
  // select

  genre_list: '',
  // select

  usageyn: 'n',
  // select
  story: '',
  // multi
  episode: '',
  // num
  priority: '',
  // num
};
