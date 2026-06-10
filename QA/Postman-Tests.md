# Postman API Tests

Endpoint:

GET http://localhost:3001/flights

## Tests

```js
pm.test('Status code is 200', function () {
  pm.response.to.have.status(200);
});

pm.test('Response is an array', function () {
  const data = pm.response.json();
  pm.expect(data).to.be.an('array');
});

pm.test('Flight object has required fields', function () {
  const data = pm.response.json();

  if (data.length > 0) {
    pm.expect(data[0]).to.have.property('id');
    pm.expect(data[0]).to.have.property('airline');
    pm.expect(data[0]).to.have.property('from');
    pm.expect(data[0]).to.have.property('to');
    pm.expect(data[0]).to.have.property('date');
    pm.expect(data[0]).to.have.property('departureTime');
    pm.expect(data[0]).to.have.property('arrivalTime');
    pm.expect(data[0]).to.have.property('price');
    pm.expect(data[0]).to.have.property('seats');
    pm.expect(data[0]).to.have.property('status');
  }
});
```
