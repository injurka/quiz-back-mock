// CORS middleware
export const allowCrossDomain = (req: any, res: any, next: any) => {
  res.header(`Access-Control-Allow-Origin`, `*`);
  res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
  res.header(`Access-Control-Allow-Headers`, `Content-Type, Accept`);
  next();
};
