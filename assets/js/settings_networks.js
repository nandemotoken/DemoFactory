
let provider;
let signer;
let network;
let contract;
let contractaddress;

let chainId_networkMap = new Map();
chainId_networkMap.set( 1 , "Ethereum mainnet" )
chainId_networkMap.set( 4 , "rinkeby testnet" )
chainId_networkMap.set( 137 , "matic mainnet" )
chainId_networkMap.set( 80001 , "matic testnet" )

let chainId_explorerMap = new Map();
chainId_explorerMap.set( 1 , "https://etherscan.io/token/" );
chainId_explorerMap.set( 4 , "https://rinkeby.etherscan.io/token/" );
chainId_explorerMap.set( 137 , "https://explorer-mainnet.maticvigil.com/tokens/" );
chainId_explorerMap.set( 80001 , "https://explorer-mumbai.maticvigil.com/tokens/" );

let chainId_openseaMap = new Map();
chainId_openseaMap.set( 1 , "https://opensea.io/" );
chainId_openseaMap.set( 4 , "https://testnets.opensea.io/" );
chainId_openseaMap.set( 137 , "https://opensea.io/" );
chainId_openseaMap.set( 80001 , "https://testnets.opensea.io/" );

let chainId_openseaChainMap = new Map();
chainId_openseaChainMap.set( 1 , "" );
chainId_openseaChainMap.set( 4 , "" );
chainId_openseaChainMap.set( 137 , "matic/" );
chainId_openseaChainMap.set( 80001 , "matic/" );

