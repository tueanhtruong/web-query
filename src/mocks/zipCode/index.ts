import { ZipCodeService } from '../../services';
import { wrapIntoResponse } from '../helpers';

const getCityStateByZipCode = (zipCode: string) => {
  const data = ZipCodeService.getPopulatedCityStateFromZipCode(zipCode);
  return wrapIntoResponse(data);
};

export default {
  getCityStateByZipCode,
};
