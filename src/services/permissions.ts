let _permissions: string[] = [];

const setPermissions = async (payload) => {
  try {
    const permissions = JSON.parse(payload?.['permissions']);
    _permissions = permissions;
  } catch {
    return null;
  }
};

const clearPermission = () => {
  _permissions = [];
};

const getPermissions = () => {
  return _permissions;
};

const webAdmin = () => ({
  canCreate: _permissions?.includes('web_admin:create'),
  canView: _permissions?.includes('web_admin:read'),
  canUpdate: _permissions?.includes('web_admin:update'),
  canDelete: _permissions?.includes('web_admin:delete'),
});

const permission = () => ({
  canCreate: _permissions?.includes('permission:create'),
  canView: _permissions?.includes('permission:read'),
  canUpdate: _permissions?.includes('permission:update'),
  canDelete: _permissions?.includes('permission:delete'),
});

const user = () => ({
  canCreate: _permissions?.includes('user:create'),
  canView: _permissions?.includes('user:read'),
  canUpdate: _permissions?.includes('user:update'),
  canDelete: _permissions?.includes('user:delete'),
});

const role = () => ({
  canCreate: _permissions?.includes('role:create'),
  canView: _permissions?.includes('role:read'),
  canUpdate: _permissions?.includes('role:update'),
  canDelete: _permissions?.includes('role:delete'),
});

export default {
  setPermissions,
  clearPermission,
  getPermissions,
  webAdmin,
  user,
  role,
  permission,
};
