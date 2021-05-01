
async function contract_deployer(){
    console.log(network.chainId)
    
    if (contractaddress) {
        window.alert("このネットワークでコントラクトを再生成するには\nまず右上のResetを押してください。\n不明点は開発スタッフにお問い合わせください");
        return;
    }
    
    
    factory = new ethers.ContractFactory(abi, bytecode, signer);
    contract = await factory.deploy();   
    console.log(contract.address);
    contractaddress = contract.address;
    await localStorage.setItem( network.name , contractaddress );
    $("#transactionmodal").modal('show');
    bar = document.getElementById("transactionprogressbar");
    setInterval( function(){  bar.innerHTML = bar.innerHTML + "." ; if (bar.innerHTML.length > 80){ bar.innerHTML = "." } } , 3 * 1000 );
    
    await contract.deployTransaction.wait();
    setTimeout( function(){location.reload()} , 5 * 1000 );
    
}

async function mint_button(){
        
    if ( !contractaddress ){
        window.alert("まず①create contractを実施してください");
        return;
    }
        
    await contract.mint();
  
    $("#transactionmodal").modal('show');
    bar = document.getElementById("transactionprogressbar");
    setInterval( function(){  bar.innerHTML = bar.innerHTML + "." ; if (bar.innerHTML.length > 80){ bar.innerHTML = "." } } , 3 * 1000 );
    
    contract.on("Mint", () => {
        setTimeout( function(){location.reload()} , 5 * 1000 );
    });
    
}

async function setmetadata_button(){
    
    nftnumber = document.getElementById("nftnumber3").value
    ipfshash = document.getElementById("ipfshash").value;
    
    if ( !contractaddress ){
        window.alert("まず①create contractを実施してください");
        return;
    }
    
    console.log(ipfshash);
    if (ipfshash.charAt(0) !== "Q"){
        window.alert("IPFSハッシュでない値が入っている可能性が高いです\n再度見直してください")
        return;
    }
    
    await contract.setTokenURI( nftnumber , "ipfs://" + ipfshash).catch(() => window.alert("エラー：未発行のNFT、または永続化されたNFTを変更しようとしていませんか？"));
    
    //localStorage.setItem( "lastsethash" , ipfshash );
    
    
    $("#transactionmodal").modal('show');
    bar = document.getElementById("transactionprogressbar");
    setInterval( function(){  bar.innerHTML = bar.innerHTML + "." ; if (bar.innerHTML.length > 80){ bar.innerHTML = "." } } , 3 * 1000 );
    
    contract.on("SetTokenURI", ( _num , _uri ) => {
        setTimeout( function(){location.reload()} , 5 * 1000 );
    });

}

async function finalizeNFT(){
    nftnumber4 = document.getElementById("secureNFTnumber4").value

    
    await contract.secureCryptoArt( nftnumber4 );
  
    $("#transactionmodal").modal('show');
    bar = document.getElementById("transactionprogressbar");
    setInterval( function(){  bar.innerHTML = bar.innerHTML + "." ; if (bar.innerHTML.length > 80){ bar.innerHTML = "." } } , 3 * 1000 );
    
    contract.on("SecureCryptoArt", ( _num ) => {
        setTimeout( function(){location.reload()} , 5 * 1000 );
    });
    
}

async function contractlocalstragereset(){
    ans = window.confirm("NFT Contract Addressを再設定するためにブラウザをリセットしますか？")
    if ( !ans ){ return; }
    
    await localStorage.removeItem( network.name );
    
    window.location.reload();
}

