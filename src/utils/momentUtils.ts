import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import momentTz from 'moment-timezone';

dayjs.extend(weekday);

export const DateFormat = 'MM/DD/YYYY';
export const DateFormatWithHour = 'DD/MM/YYYY HH:mm';
export const DateFormatDisplay = 'MMMM DD, YYYY';
export const DateFormatDisplayShort = 'MMM DD, YYYY';
export const DateFormatDisplayMinute = 'MM/DD/YYYY hh:mm:ss A';

export const TimeFormat = 'HH:mm';

/**
 * Get date display
 * @param {string|date|Dayjs} value
 * @param {string} languageCode
 */
export const getDateDisplay = (value: string) => {
  return dayjs(value).format(DateFormat);
};

/**
 * Get date display
 * @param {string|date|Dayjs} value
 * @param {string} languageCode
 */
export const getTimeDisplay = (value: string) => {
  return dayjs(value).format(TimeFormat);
};

/// dayjs has many cases incorrect format with timezone so using moment-timezone for this case
/// Reference issues : https://github.com/iamkun/dayjs/issues/1827
export const localTimeToHawaii = (dateTime) => {
  const date = momentTz(dateTime).format(DateFormatWithHour);
  return momentTz(date, DateFormatWithHour).utcOffset('-1000').format(DateFormatDisplayMinute);
};
