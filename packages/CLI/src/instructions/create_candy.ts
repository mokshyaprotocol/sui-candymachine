import { RawSigner,RpcTxnDataSerializer,Ed25519Keypair,JsonRpcProvider, Network } from '@mysten/sui.js';
import * as fs from "fs"
export async function create_candy(alice,fileStream,provider) {
    let collection_mutable = [false,false,false,false,false]
    let token_mutable = [false,false,false]
    if(fileStream["mutable"]){
      collection_mutable = [true,true,true,true,true,]
      token_mutable = [true,true,true,]
    }
    const signer = new RawSigner(alice, provider);
        const moveCallTxn = await signer.executeMoveCall({
            packageObjectId: '0x9a69f15508a7293f639da0a99206f2526bd03642',
            module: 'candymachine',
            function: 'init_candy',
            typeArguments: [],
            arguments: [
                    fileStream['collection_name'],
                    fileStream['collection_description'],
                    fileStream['baseuri'],
                    fileStream['royalty_payee_address'],
                    fileStream['royalty_points_denominator'],
                    fileStream['royalty_points_numerator'],
                    fileStream['presale_mint_time'],
                    fileStream['public_sale_mint_time'],
                    fileStream['presale_mint_price'],
                    fileStream['public_sale_mint_price'],
                    fileStream['total_supply'],
                    "Mokshya",
            ],
            gasBudget: 10000,
        });
    let check_txn = await moveCallTxn['EffectsCert']['effects']['effects']['created'][0]['reference']['objectId']
    fileStream['objectId']= check_txn
    console.log('Candy Machine Created - Object ID: '+check_txn)
    let argIndex = process.argv.indexOf('--config')
    fs.writeFileSync(process.argv[argIndex+1], JSON.stringify(fileStream));
    return moveCallTxn
  }
