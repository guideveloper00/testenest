export type ICreateTransactionInput = {
  amount: number;
  timestamp: Date;
};

export type ICreateTransactionOutput = {
  amount: number;
  timestamp: string;
  uuid: string;
};
