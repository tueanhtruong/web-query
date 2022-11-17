import axios from 'axios';
import JSZip from 'jszip';
import appConfig from 'src/appConfig';
import { isEmpty } from '../validations';

export type NationalBanking = {
  routing_number: string;
};

let banks: NationalBanking[] = [];

const NATIONAL_BANKING_PATH = 'bank';

const loadNationalBanking = async () => {
  const bankingOptions = localStorage.getItem(NATIONAL_BANKING_PATH);
  if (bankingOptions) {
    return new Promise((res) => {
      const parseBanking = JSON.parse(bankingOptions);
      banks = parseBanking;
      res(parseBanking);
    });
  }
  try {
    const data = await getNationalBankFileZip();
    banks = data;
    localStorage.setItem(NATIONAL_BANKING_PATH, JSON.stringify(data));
    return data;
  } catch {}
};

const getNationalBanking = async (routingNumber) => {
  if (isEmpty(banks)) {
    await loadNationalBanking();
  }
  const nationalBankingName = banks.find((x) => `0${x?.routing_number}` === routingNumber);
  return nationalBankingName;
};

const getNationalBankFileZip = async (): Promise<NationalBanking[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      axios
        .get(`${appConfig.AWS_S3_WEB_LOGIN_BUCKET_URL}/files/bank.zip`, {
          responseType: 'blob',
          withCredentials: false,
        })
        .then((data) => data.data)
        .then(JSZip.loadAsync)
        .then((zip) => {
          return zip.file('bank.json').async('string');
        })
        .then(async (text) => {
          // eslint-disable-next-line security/detect-eval-with-expression, no-eval
          const parseData = await eval('(' + text + ')');
          resolve(parseData.banks);
        });
    } catch (err) {
      reject(err);
    }
  });
};

export default { getNationalBanking };
