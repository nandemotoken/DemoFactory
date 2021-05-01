
window.onload = async function() {

    console.log("IPFS_Hash_example: QmVNKKhPomQc4fHYvdiKBwFXdHKvSWu8Rkm7pfD1Db8f25")
    
    await initializeMetaMask();
    await setVisual();
    await setOpenSeaLink();
    await setNFTSecureLink();
}


async function initializeMetaMask(){
    window.ethereum.enable();
    ethereum.on('chainChanged', (_chainId) => window.location.reload());
    provider = await new ethers.providers.Web3Provider(window.ethereum);
    signer = await provider.getSigner();
    network = await provider.getNetwork();
    contractaddress = localStorage.getItem(network.name);

    //chainIdで表示
    document.getElementById("networkstatus").innerHTML = `現在のネットワーク：${network.chainId}` 
    
    //もし別名があればそれで表示
    if (chainId_networkMap.has( network.chainId )){
        document.getElementById("networkstatus").innerHTML = `現在のネットワーク：${chainId_networkMap.get(network.chainId)}`
    }    

    checkNextNFTNumber();

}

async function checkNextNFTNumber(){
    //console.log(contractaddress);
    if ( !contractaddress ){
    document.getElementById("makecontractheadingrow").classList.remove("deploy");
    document.getElementById("makecontractbuttonrow").classList.remove("deploy");
    document.getElementById("mint_button").classList.remove("deploy");
    return;
    }
    
    document.getElementById("nftcontractaddress").innerHTML = `NFT Contract Address : ${contractaddress}`
    
    contract = await new ethers.Contract( contractaddress , abi , signer );
    nftnumber = await contract.number();
    document.getElementById("NextNftNumber").innerHTML = `Next NFT Number : ${nftnumber}`;
}



async function setVisual(){
    opensea = document.getElementById("opensea");
//    console.log("onload ok")
    opensea.addEventListener("mouseover", function( event ) {
    opensea.style.opacity=1; 
    }, false);    
    opensea.addEventListener("mouseleave", function( event ) {
    opensea.style.opacity=0.3; 
    }, false);    
}

async function setOpenSeaLink(){
    document.getElementById("opensealink").href = chainId_explorerMap.get(network.chainId) + "account";
}


async function setNFTSecureLink(){
    document.getElementById("secureNFTnumber4").addEventListener("change",function () {
        document.getElementById("secureNFTLink").innerHTML = `${chainId_explorerMap.get(network.chainId)}assets/${contractaddress}/${document.getElementById("secureNFTnumber4").value}`
    document.getElementById("secureNFTLink").href = `${chainId_explorerMap.get(network.chainId)}assets/${contractaddress}/${document.getElementById("secureNFTnumber4").value}`

    })
}