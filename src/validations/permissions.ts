import { Permission } from 'src/redux/auth/types';
import { isEmpty } from '.';

export const hasPagePermission = (userPermissions: string[], pagePermissions?: Permission[]) => {
  if (!pagePermissions) return true;
  if (isEmpty(pagePermissions)) return true;
  return pagePermissions.some((permission) => userPermissions.includes(permission));
};
