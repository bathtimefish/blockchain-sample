// https://note.mu/strictlyes/n/n40e5884229a5

import Blockchain from './blockchain';

const bitcoin = new Blockchain();

//トランザクション生成
bitcoin.createNewTransaction(
 100,
 "ALICE090970FYFFYFYFIF",
 "BOB797789790JFJFFGFJF"
);

const mining = (bitcoin) => {
 //前のブロックを取得
 const lastBlock = bitcoin.getLastBlock();

//前のブロックハッシュを取得
 const previousBlockHash = lastBlock["hash"];

 //現在のブロックのデータ
 const currentBlockData = {
   transactions: bitcoin.pendingTransactions,
   index: lastBlock["index"] + 1
 };

 //Powでnonceを求める。
 const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);

 //前回のブロックのハッシュ、今回のブロックのデータ、nonceを元にハッシュを求める
 const blockHash = bitcoin.hashBlock(
   previousBlockHash,
   currentBlockData,
   nonce
 );

//ブロックを生成
 const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash);
};

mining(bitcoin);

bitcoin.createNewTransaction(
 200,
 "ALICE090970FYFFYFYFIF",
 "BOB797789790JFJFFGFJF"
);

mining(bitcoin);

bitcoin.createNewTransaction(
 300,
 "ALICE090970FYFFYFYFIF",
 "BOB797789790JFJFFGFJF"
);

mining(bitcoin);

console.log(bitcoin);