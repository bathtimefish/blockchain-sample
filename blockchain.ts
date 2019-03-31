import * as sha256 from 'sha256';

declare namespace blockchain {

  interface transaction {
    amount: number,
    sender: string,
    recipient: string
  }

  interface block {
    index: number,
    timestamp: number,
    transactions: transaction[],
    nonce: number,
    hash: string,
    previousBlockHash: string 
  }

}

class Blockchain {

  chain: blockchain.block[];
  pendingTransaction: blockchain.transaction[];

  constructor() {
    this.chain = [];
    this.pendingTransaction = [];
    this.createNewBlock(100, "0", "0"); // generate genesis block
  }

  public createNewBlock(nonce: number, previousBlockHash: string, hash: string): blockchain.block {
    const newBlock = {
      index: this.chain.length + 1,
      timestamp: Date.now(),
      transactions: this.pendingTransaction,
      nonce: nonce,
      hash: hash,
      previousBlockHash: previousBlockHash
    };
    this.pendingTransaction = [];
    this.chain.push(newBlock);
    return newBlock;
  }

  public getLastBlock(): blockchain.block {
    return this.chain[this.chain.length - 1];
  }

  public createNewTransaction (amount: number, sender: string, recipient: string): number {
    const newTransaction = {
      amount: amount,
      sender: sender,
      recipient: recipient
    };
    this.pendingTransaction.push(newTransaction);
    const lastBlock = this.getLastBlock();
    return lastBlock.index + 1;
  };

  public hashBlock (previousBlockHash: string, currentBlockData: blockchain.block[], nonce: number): string {
    const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
    const hash = sha256(dataAsString);
    return hash;
  };

  public proofOfWork (previousBlockHash: string, currentBlockData: blockchain.block[]): number {
    let nonce = 0;
    let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
    while (hash.substring(0, 4) !== "0000") {
      nonce++;
      hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
    }
    return nonce;
  };

}

export default Blockchain;