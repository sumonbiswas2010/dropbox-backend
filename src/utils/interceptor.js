const mockRequest = () => {
  const req = {};
  req.body = jest.fn().mockReturnValue(req);
  req.params = jest.fn().mockReturnValue(req);
  req.userData = jest.fn().mockReturnValue(req);
  return req;
};

const mockResponse = () => {
  const res = {};
  res.send = jest.fn().mockReturnValue(res);
  res.httpStatus = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

module.exports = {
  mockRequest,
  mockResponse,
};
