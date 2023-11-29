const axios = require('axios');
const countriesController = require('../controller/countriesController');

jest.mock('axios');

test('getCountryInfo', async () => {
  const mockResponse = [
    {
        "name": {
            "common": "Portugal",
            "official": "Portuguese Republic",
        },
        "flag": "🇵🇹"
    }
  ];
  axios.get.mockResolvedValue({ data: mockResponse }); 

  const req = { query: { name: 'Portugal' } };
  const res = {
    json: jest.fn(),
    status: jest.fn()
  };

  await countriesController.getCountryInfo(req, res);
  expect(res.json).toHaveBeenCalledWith(mockResponse);
  expect(res.status).not.toHaveBeenCalled(); 
});


test('getCountryInfoError', async () => {
    const mockErrorResponse = {
        response: {
          status: 404,
          data: {}
        }
      };
  
      axios.get.mockRejectedValue(mockErrorResponse);
  
    const req = { query: { name: 'NonExistentCountry' } };
    const res = {
      json: jest.fn(),
      status: jest.fn()
    };
  
    await countriesController.getCountryInfo(req, res);
  
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Country not found' });
  });