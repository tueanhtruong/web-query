import { CancelToken } from 'apisauce';
import shortid from 'shortid';
import cn from 'classnames';
import {
  formatPhoneNumberIntl,
  formatPhoneNumber as formatLocalPhoneNumber,
} from 'react-phone-number-input';
import { parse } from 'qs';
import dayjs from 'dayjs';
import Compressor from 'compressorjs';

import appConfig from 'src/appConfig';
import { isEmpty } from 'src/validations';
import { Location } from 'history';
// import { AccountStatus, StatementStatus } from 'src/redux/account/types';
import { StateOption } from 'src/appConfig/options';
import _ from 'lodash';

export const handleGetError = (touched, errors, prefix) =>
  _.get(touched, prefix) ? _.get(errors, prefix) : '';

export const waiter = (time: number = 100) =>
  new Promise<Array<any>>((res) => setTimeout(() => res([]), time));
// import vnLocale from 'dayjs/locale/vi';
// var updateLocale = require('dayjs/plugin/updateLocale');
// export const updateVnLocale = () => {
//   dayjs.extend(updateLocale);
//   const newLocale = {
//     ...vnLocale,
//     meridiem: (hour, minute, isLowercase) => {
//       return hour >= 12 ? 'CH' : 'SA';
//     },
//   };
//   dayjs?.['updateLocale']('vi', newLocale);
// };

export function newCancelToken(timeout = appConfig.CONNECTION_TIMEOUT) {
  const source = CancelToken.source();
  setTimeout(() => {
    source.cancel();
  }, timeout);

  return { cancelToken: source.token };
}

export const getRandomId = (): string => shortid.generate();

export const generateArray = (length: number, initial = '') => Array(length).fill(initial);

export const stringify = (params: { [key: string]: number | string | string[] }) => {
  let result = '';

  Object.keys(params).forEach((key) => {
    if (!isEmpty(params[`${key}`])) {
      if (Array.isArray(params[`${key}`])) {
        let array = params[`${key}`] as string[];
        array.forEach((param: string) => {
          result += `&${key}=${encodeURIComponent(param)}`;
        });
      } else {
        result += `&${key}=${encodeURIComponent(params[`${key}`].toString())}`;
      }
    }
  });

  result = result.replace(/^&/, '');

  return result;
};

export const getYesNo = (value: boolean, highLightValue = 'YES') => {
  if (isEmpty(value)) return '';
  const result = value ? 'YES' : 'NO';
  const isHighLight = highLightValue === result;
  return <span className={cn({ 'has-text-danger': isHighLight })}>{result}</span>;
};

export const getLocationState = (location: Location<string>) => {
  const locationState = location.state;
  const state = parse(locationState, { ignoreQueryPrefix: true });

  return state;
};

export const formatPhoneNumber = (mobile: string) => {
  if (!mobile) return '';
  try {
    if (mobile.startsWith('+1')) return `+1 ${formatLocalPhoneNumber(mobile)}`;
    return formatPhoneNumberIntl(mobile);
  } catch (error) {
    return '';
  }
};

export const formatDate = (value: string, format: string = 'MM/DD/YYYY') => {
  if (!value) return '';

  return dayjs(value).format(format);
};

export const formatDateWithTimeZone = (value: string, format: string = 'MM/DD/YYYY') => {
  var customDayjs = require('dayjs');
  var timezone = require('dayjs/plugin/timezone');
  customDayjs.extend(timezone);
  return customDayjs().tz('US/Hawaii').format(format);
};

export const formatShowSSN = (value: string, from: number = 6) => {
  return `*******${value.slice(from)}`;
};

export const getWeekDay = (value: string) => {
  if (!value) return '';
  return dayjs(value).format('dddd');
};

export const getClassNameByStatus = (status) => {
  switch (status) {
    case 'Pending':
      return 'is-status-pending ';
    case 'Completed':
    case 'Approved':
    case 'Active':
      return 'is-status-active';
    case 'Rejected':
      return 'is-status-rejected';
    default:
      return '';
  }
};

export const convertStateOptionsToOptions = (options: StateOption[]) =>
  options.map((option) => ({ value: option.name, label: option.name }));

export const getYesNoText = (value: boolean) => (value ? 'Yes' : 'No');

export const formatMoney = (value: number) =>
  value
    .toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    })
    .replace(/\./g, ',');

export const formatMoneyInput = (value: number) => {
  if (!value) return '';
  return value.toLocaleString('en-US', {
    maximumFractionDigits: 0,
  });
};
export const hourDateFormat = 'h:mm:ss a, MMMM DD, YYYY';
export const dateTimeFormat = 'MM/DD/YYYY HH:MM:ss A';
export const monthFormat = 'MMMM DD, YYYY';

export const emptyFunction = () => {};

export const compressFile = (file: File) => {
  return new Promise((resolve, reject) => {
    const isImage = ['image/jpg', 'image/jpeg', 'image/png'].includes(file?.type);

    if (isImage) {
      new Compressor(file, {
        quality: 0.7,
        maxWidth: 900,
        maxHeight: 900,
        convertSize: 0,
        success(result) {
          resolve(result);
        },
        error(err) {
          reject(err);
        },
      });
    } else {
      resolve(file);
    }
  });
};

export const trimUrlHasEndDate = (url: string) => {
  const trimUrl = url.split('?')[0];
  const items = trimUrl.split('_');
  return items.slice(0, items.length - 1).join('');
};

export const trimUrl = (url: string) => {
  if (!url) return null;
  return url.split('?')[0];
};

export const getFileType = (file: File) => {
  if (!!file.type) return file.type;
  if (file.name.includes('.rar')) return 'application/x-rar-compressed';
  if (file.name.includes('.7z')) return 'application/x-7z-compressed';
  return 'image/png';
};

export const getNavigateUrl = (url: string) => (url.includes('http') ? url : `https://${url}`);

export const getRoleName = (role: string) => {
  if (role === 'SYSTEM_ADMINISTRATOR') return 'System Admin';
  else if (role === 'USER') return 'User';
  else if (role === 'APPRAISER') return 'Appraiser';
  else if (role === 'SUPERVISOR') return 'Supervisor';
};

export const isURLImage = (url: string) => {
  if (isEmpty(url)) return false;

  const hasExtensionImage = [
    '.png',
    '.jpeg',
    '.jpg',
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/svg',
  ].some((ext) => url?.includes(ext));

  if (hasExtensionImage) {
    return true;
  }

  const state = parse(url?.split('?')[1], { ignoreQueryPrefix: false });
  const contentType = state?.['Content-Type'];
  const isImage = ['image/jpg', 'image/jpeg', 'image/png'].includes(contentType as string);

  return isImage;
};

export const getStartCase = (value: string) => (value ? _.startCase(value.toLowerCase()) : '');

export const getTitleCase = (str: string): string => {
  if (!str) return '';
  return _.startCase(_.toLower(str));
};

export const handleClick = (callback) => (event: React.MouseEvent<any>) => {
  event.stopPropagation();
  event.preventDefault();
  if (callback) callback(event);
};

//link https://stackoverflow.com/questions/42674473/get-all-keys-of-a-deep-object-in-javascript
export const deepKeys = (t, path = []) => {
  const res =
    Object(t) === t
      ? Object.entries(t) // 1
          .flatMap(([k, v]) => deepKeys(v, [...path, k]))
      : [path.join('.')]; // 2
  return res?.filter((x) => !/\d$/.test(x));
};

export const scrollToTopError = (error: string[]) => {
  if (!isEmpty(error)) {
    const input = document?.querySelector(`[name='${error[0]}']`);
    input?.parentElement?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'start',
    });
  }
};
export const moneyReg = /[\d,]+\.{0,1}\d{0,2}/;

export const MoneyInputDetect = (value) => `${value}`.match(moneyReg)?.[0] || '';

export const removeSpecialCharacterFromString = (value: string) => {
  return value.replace(/[^a-zA-Z0-9 ]/g, '');
};

export const formatStringToNumber = (value: string) => {
  if (isEmpty(value)) return null;
  return Number(value);
};
