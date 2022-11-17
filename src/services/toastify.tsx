import {
  AiFillWarning
} from 'react-icons/ai';
import { IoCheckmarkCircleSharp, IoInformationCircleSharp } from 'react-icons/io5';
import { MdOutlineError } from 'react-icons/md';
import { toast, ToastOptions } from 'react-toastify';
import { COLOR_CODE } from '../appConfig/constants';

const error = (
  error?: string,
  options: ToastOptions = {
    icon: <MdOutlineError color={COLOR_CODE.WHITE} fontSize={24} />,
  }
) => {
  console.log('errorHandler', error);
  toast.error(
    error ? error : 'An error has occurred. Please check your data and try again.',
    options
  );
};

const success = (
  message: string,
  options: ToastOptions = {
    icon: <IoCheckmarkCircleSharp color={COLOR_CODE.WHITE} fontSize={24} />,
  }
) => {
  toast.success(message, options);
};

const warning = (
  message: string,
  options: ToastOptions = {
    icon: <AiFillWarning color={COLOR_CODE.WHITE} fontSize={24} />,
  }
) => {
  console.log('warningHandler', message);
  toast.warning(message, options);
};
const info = (
  message: string,
  options: ToastOptions = {
    icon: <IoInformationCircleSharp color={COLOR_CODE.WHITE} fontSize={24} />,
  }
) => {
  toast.info(message, { ...options });
};

export default {
  error,
  success,
  warning,
  info,
};
