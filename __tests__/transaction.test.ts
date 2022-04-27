import app from '../src/app';
import supertest from 'supertest';
import path, { dirname } from 'path';
import fs from 'fs/promises';

const dbPath = path.join(__dirname, '../data/databaseTwo.json');
const dbPathTwo = path.join(__dirname, '../data/database.json');

const transMockData = {
  senderAccountNumber: '989817191197',
  amount: 50,
  receiverAccountNumber: '969817191198',
  transferDescription: 'Money for pizza',
  reference: 'f5512d2c-e540-4847-82dd-65a47a3310be',
  createdAt: '2022-04-07T19:48:01.262Z',
};
//BALANCE MOCK DATA
const mockData = {
  balance: 100000,
  accountNumber: '969817191197',
  createdAt: '2022-04-07T18:42:24.680Z',
};
beforeAll(async () => {
  await fs.writeFile(dbPath, JSON.stringify([mockData]));
  await fs.writeFile(dbPathTwo, JSON.stringify([transMockData]));
});
afterAll(async () => {
  await fs.unlink(dbPath);
  await fs.unlink(dbPathTwo);
});
describe('GET /balance', () => {
  test('GET /balance', () => {
    return supertest(app)
      .get('/balance')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        console.log(res.body);
        expect(res.body).toEqual([mockData]);
      });
  });
});

describe('It creates account', () => {
  test('POST /create-account', () => {
    return supertest(app)
      .post('/create-account')
      .send({
        balance: 2000,
      })
      .expect(201)
      .expect('Content-Type', /json/)
      .then((res) => {
        console.log(res.body);
      });
  });
});

//FOR TRANSFER ROUTE
//TRANSACTION MOCK DATA
// const mockDataTransaction = {
//   reference: 'c496a3a3-5201-4a58-99b3-0066755c089d',
//   senderAccount: '290878148632',
//   amount: 50,
//   receiverAccount: '841652815168',
//   transferDescription: 'money for pizza',
//   createdAt: '2022-04-06T13:32:32.937Z',
// };

// beforeAll(async () => {
//   await fs.writeFile(dbPathTwo, JSON.stringify([mockDataTransaction]));
// });
// afterAll(async () => {
//   await fs.unlink(dbPathTwo);
// });
// describe('POST /transfer', () => {
//   test('POST /transfer', () => {
//     return supertest(app)
//       .post('/transfer')
//       .expect(201)
//       .expect('Content-Type', /json/)
//       .then((res) => {
//         expect(res.body).toEqual([mockDataTransaction]);
//       });
//   });
// });

// eslint-disable-next-line @typescript-eslint/no-var-requires

describe('POST /transfer', () => {
  const message = { message: 'you cannot make this transfer' };
  test('POST /transfer', () => {
    return supertest(app)
      .post('/transfer')
      .send({
        senderAccountNumber: '989817191197',
        amount: 50,
        receiverAccountNumber: '969817191198',
        transferDescription: 'Money for abortion',
        reference: 'f5512d2c-e540-4847-82dd-65a47a3310be',
      })
      .expect(201)
      .expect('Content-Type', /json/)
      .then((res) => {
        console.log(res.body);
        expect(404);
      });
  });
});
