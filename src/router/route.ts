import express from 'express';
import {
  getBalances,
  getACertainBalance,
  createAccount,
  makeTransfer,
} from '../controller/companyController';

const router = express.Router();
//get all account
router.get('/balance', async (req, res) => {
  const balance = await getBalances();
  res.status(200).json(JSON.parse(balance));
});
//get a certain account
router.get('/balance/:accountNumber', async (req, res) => {
  const accountNumber = req.params.accountNumber;
  const singleAccount = await getACertainBalance(accountNumber);
  if (!singleAccount) {
    res.status(404).json({ message: 'account number does not exist' });
  } else {
    res.status(200).json(singleAccount);
  }
});
//create account
router.post('/create-account', async (req, res) => {
  const handleUser = req.body.balance;
  console.log('balance', handleUser);
  const newAccount = await createAccount(handleUser);
  res.status(201).json({ message: newAccount });
});

//transfer transaction
router.post('/transfer', async (req, res) => {
  try {
    const transferTran = req.body;
    const userTransaction = await makeTransfer(transferTran);
    res.status(201).json({ message: userTransaction });
  } catch (err) {
    if (err) {
      res.status(404).json({ error: 'fetch failed' });
    }
  }
});

export default router;
