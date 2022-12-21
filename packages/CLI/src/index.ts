#!/usr/bin/env node
import { RawSigner,RpcTxnDataSerializer,Ed25519Keypair,JsonRpcProvider, Network } from '@mysten/sui.js';
import { fromB64 } from '@mysten/bcs';import * as fs from "fs"
import {create_candy} from "./instructions/create_candy"
import {makeid} from "./utils/seedGenerate"
import {program} from "commander"

program
  .version('0.0.1')
  .description("Candy machine smart contract for SUI Blockchain.")
  .option('-c, --create_candy', 'create_candy')
  .option('-w, --create_whitelist', 'create_whitelist')
  .option('-w, --config', 'config')
  .option('-p, --pause_mint', 'pause_mint')
  .parse(process.argv);

let argIndex = process.argv.indexOf('--config')

const fileStream = JSON.parse(fs.readFileSync(process.argv[argIndex+1],"utf8"));
const options = program.opts();
const provider = new JsonRpcProvider(Network.DEVNET);


// const fileStream = JSON.parse(fs.readFileSync('config.json',"utf8"));

if (options.create_candy) {
  const alice = Ed25519Keypair.fromSecretKey(fromB64(fileStream['creator_private_key']));
  create_candy(alice,fileStream,provider);  
}
if (options.create_whitelist) {
  const alice = Ed25519Keypair.fromSecretKey(fromB64(fileStream['creator_private_key']));
}
if (!process.argv.slice(1).length) {
  program.outputHelp();
}

