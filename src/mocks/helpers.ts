const WAITING_TIME = 600;

export const wrapIntoResponse = (data: any) => {
  return new Promise(resolve => {
    setTimeout(() => resolve({ ok: true, data }), WAITING_TIME);
  });
};
