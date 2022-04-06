export interface Transactions {
  reference: string;
  senderAccount: number;
  amount: number;
  receiverAccount: number;
  transferDescription: string;
  createdAt: string;
}

//balance database
export interface Balances {
  account: string;
  balance: number;
  createdAt: string;
}
