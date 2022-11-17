import axios from 'axios';
import JSZip from 'jszip';
import appConfig from 'src/appConfig';
import { isEmpty } from '../validations';

export type ZipCode = {
  zipCode: string;
  city: string;
  state: string;
};

let zipCodes: ZipCode[] = [];

const LOCAL_ZIP_CODES_PATH = 'zip-code';

const loadZipCodes = async () => {
  const zipCodeOptions = localStorage.getItem(LOCAL_ZIP_CODES_PATH);
  if (zipCodeOptions) {
    return new Promise((res) => {
      const parseZipCodes = JSON.parse(zipCodeOptions);
      zipCodes = parseZipCodes;
      res(parseZipCodes);
    });
  }

  try {
    const data = await getZipCodesFileZip();
    zipCodes = data;
    localStorage.setItem(LOCAL_ZIP_CODES_PATH, JSON.stringify(data));
    return data;
    // }
  } catch {}
};

const getPopulatedCityStateFromZipCode = async (zipCode) => {
  if (isEmpty(zipCodes)) {
    await loadZipCodes();
  }
  const populatedCityState = zipCodes.find((x) => x?.zipCode === zipCode);
  return populatedCityState;
};

const getZipCodesFileZip = async (): Promise<ZipCode[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      axios
        .get(`${appConfig.AWS_S3_WEB_LOGIN_BUCKET_URL}/files/zipcode.zip`, {
          responseType: 'blob',
          withCredentials: false,
        })
        .then((data) => {
          return data.data;
        })
        .then(JSZip.loadAsync)
        .then((zip) => {
          return zip.file('zipcode.json').async('string');
        })
        .then(async (text) => {
          // eslint-disable-next-line security/detect-eval-with-expression, no-eval
          const parseData = await eval('(' + text + ')');
          resolve(parseData.zipCodeAll);
        });
    } catch (err) {
      reject(err);
    }
  });
};

export default { getPopulatedCityStateFromZipCode };
