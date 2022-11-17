import jwt_decode from 'jwt-decode';
import { TokenService } from '.';

const LOCAL_STORAGE_ROLE = 'identified-role';
const USER_ROLE = 'USER';
const SYSTEM_ADMINISTRATOR_ROLE = 'SYSTEM_ADMINISTRATOR';

type Role = { id: number; name: string };

const setIdentifiedRoles = (value: boolean) => {
  localStorage.setItem(LOCAL_STORAGE_ROLE, JSON.stringify(value));
};
const clearRoles = () => {
  localStorage.removeItem(LOCAL_STORAGE_ROLE);
};

const getRole = async (): Promise<{
  roles: Array<Role>;
  isAdmin: boolean;
  isAlreadyIdentifiedRole: boolean;
}> => {
  const identifiedRoles = localStorage.getItem(LOCAL_STORAGE_ROLE);
  const parseIdentifiedRoles = identifiedRoles ? JSON.parse(identifiedRoles) : false;

  try {
    const token = (await TokenService.getToken()) as string;
    const decodeToken = jwt_decode(token);
    const roles = JSON.parse(decodeToken?.['roles']);
    setIdentifiedRoles(true);
    return { roles, isAlreadyIdentifiedRole: parseIdentifiedRoles, isAdmin: isAdminRole(roles) };
  } catch {
    return null;
  }
};

const isAdminRole = (roles: Role[]) => roles.some((x) => x.name === SYSTEM_ADMINISTRATOR_ROLE);

export default {
  getRole,
  clearRoles,
  USER_ROLE,
  SYSTEM_ADMINISTRATOR_ROLE,
};
