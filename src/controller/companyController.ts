import {
  readDatabase,
  writeDatabase,
  readDatabaseTwo,
  writeDatabaseTwo,
} from '../model/companyModel';
import { Balances, Transactions } from '../types';
import zod from 'zod';
const { randomUUID } = require('crypto');

//CREATE A SCHEMA
const createAccountSchema = zod.object({
  accountNumber: zod.string().optional(),
  balance: zod.number(),
  createdAt: zod.string().optional(),
});

//CREATE TRANSFER SCHEMA
const createTransferSchema = zod.object({
  reference: zod.string().optional(),
  senderAccountNumber: zod.string(),
  amount: zod.number(),
  receiverAccountNumber: zod.string(),
  transferDescription: zod.string(),
  createdAt: zod.string().optional(),
});

//GET ALL BALANCE
export const getBalances = () => {
  return readDatabaseTwo();
};

//GET SINGLE BALANCE
export const getACertainBalance = async (accountNumber: string) => {
  const data = await readDatabaseTwo();
  const balances = JSON.parse(data);
  const singleBalance = balances.find(
    (data: any) => data.account === accountNumber,
  );
  //   if (!singleBalance) {
  //     return 'account number not found';
  //   } else {
  return singleBalance;
  //   }
};

//CREATE ACCOUNT
export const createAccount = async (balance: number) => {
  const userBalance = await readDatabaseTwo();
  const newBalance = JSON.parse(userBalance);

  const accountNumber = Math.floor(Math.random() * 1000000000000).toString();
  const createNewAccount: Balances = {
    account: accountNumber,
    balance: balance,
    createdAt: new Date().toISOString(),
  };

  newBalance.push(createNewAccount);
  await writeDatabaseTwo(newBalance);
  return createNewAccount;
};

//make transfer
export const makeTransfer = async (transferDetails: Transactions) => {
  const madeTransfer = await readDatabaseTwo();
  const allUsers = JSON.parse(madeTransfer);
  const madeSecondTransfer = await readDatabase();
  const secondAmountTransfered = JSON.parse(madeSecondTransfer);

  const userTransferDeatails: Transactions = {
    reference: randomUUID(),
    senderAccount: transferDetails.senderAccount,
    amount: transferDetails.amount,
    receiverAccount: transferDetails.receiverAccount,
    transferDescription: transferDetails.transferDescription,
    createdAt: new Date().toISOString(),
  };

  const senderInTheDatabase = allUsers.findIndex(
    (user: any) => user.account === transferDetails.senderAccount,
  );
  const receiverAccountInTheDatabase = allUsers.findIndex(
    (user: any) => user.account === transferDetails.receiverAccount,
  );

  if (senderInTheDatabase === -1) {
    return 'sender account does not exist';
  }

  let senderAccount = allUsers[senderInTheDatabase];
  let receiverAccount = allUsers[receiverAccountInTheDatabase];

  if (transferDetails.amount > senderAccount.balance) {
    return 'you cannot make this transfer';
  }

  if (receiverAccountInTheDatabase === -1) {
    return { msg: 'account number does not exist' };
  } else {
    senderAccount.balance -= transferDetails.amount;
    receiverAccount.balance += transferDetails.amount;
  }
  console.log(senderAccount.balance);
  console.log(receiverAccount.balance);
  console.log(transferDetails.amount);

  await writeDatabaseTwo(allUsers);

  secondAmountTransfered.push(userTransferDeatails);
  await writeDatabase(secondAmountTransfered);

  return userTransferDeatails;
};
