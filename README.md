Candy machine smart contract for SUI Blockchain. The smart contract is available in devnet. For detail information please go to our [docs](https://docs.mokshya.io)

Devnet contract : 0x9a69f15508a7293f639da0a99206f2526bd03642

# Build Move contract
 
 ```shell 
 sui move build 
 ```

# Test Move contract
 
 ```shell 
 sui move test  
 ```
# Deploy Move contract
 
 ```shell 
 sui client publish --gas-budget 1000000
 ```
# Set up candy machine 

```shell
ts-node packages/CLI/src/index.ts --create_candy  --config /config.json/path
```