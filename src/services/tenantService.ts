import _ from 'lodash';
import { getStartCase } from 'src/utils';
import navigator from './navigator';

export enum Tenants {
  CLAIMANT = 'claimant',
  EMPLOYER = 'employer',
  TPA = 'tpa',
  ADMIN = 'admin',
}

const TenantOptions = Object.values(Tenants).map((value) => ({
  label: value === Tenants.TPA ? _.upperCase(value) : getStartCase(value),
  isHideOnProduction: false, //value === Tenants.ADMIN,
  value,
}));

const DefaultTenant = Tenants.CLAIMANT;

type Tenant = {
  name: string;
};

let _tenant: Tenant = {
  name: '',
};

const setTenant = (tenant?: Tenant) => {
  if (tenant) return (_tenant = tenant);
};

const getTenant = () => _tenant;

const getWebTenant = () => {
  const subDomain = navigator.getSubdomain();
  const isHasSubdomain = Object.values(Tenants).some((item) => item === subDomain);
  const validSubdomain = isHasSubdomain ? subDomain : DefaultTenant;
  return validSubdomain;
};

const changeWebTenant = (tenant: string) => {
  const validSubdomain = getWebTenant();
  if (tenant !== validSubdomain) {
    const nextDomain = tenant === DefaultTenant ? '' : tenant;
    return navigator.jumpToCrossDomain(nextDomain);
  }
};

// ================== Check tenant ==================
const isClaimant = () => _tenant?.name === Tenants.CLAIMANT;
const isEmployer = () => _tenant?.name === Tenants.EMPLOYER;
const isTPA = () => _tenant?.name === Tenants.TPA;
const isAdmin = () => _tenant?.name === Tenants.ADMIN;

export {
  setTenant,
  getTenant,
  isClaimant,
  isEmployer,
  isTPA,
  isAdmin,
  DefaultTenant,
  changeWebTenant,
  getWebTenant,
  TenantOptions,
};
