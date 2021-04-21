


window.onload = async function() {
    
    window.ethereum.enable();
    
    ethereum.on('chainChanged', (_chainId) => window.location.reload());

    console.log("IPFS_Hash_example: QmVNKKhPomQc4fHYvdiKBwFXdHKvSWu8Rkm7pfD1Db8f25")
    
    provider = await new ethers.providers.Web3Provider(window.ethereum);
    signer = await provider.getSigner();
    network = await provider.getNetwork();
    
    
    
    contractaddress = localStorage.getItem(network.name);
    
    
    document.getElementById("networkstatus").innerHTML = `現在のネットワーク：${network.chainId}` 
    
    if (chainId_networkMap.has( network.chainId )){
        document.getElementById("networkstatus").innerHTML = `現在のネットワーク：${chainId_networkMap.get(network.chainId)}`
    }


    // lastsethash = localStorage.getItem( "lastsethash");
    
    // if (lastsethash) {
    //     document.getElementById("ipfshash").value = lastsethash;
    // }
    
    if ( !contractaddress ){
        //document.getElementById("NextNftNumber").innerHTML = "no contract created"    
        return;
    }
    
    document.getElementById("nftcontractaddress").innerHTML = `NFT Contract Address : ${contractaddress}`
    
    contract = await new ethers.Contract( contractaddress , abi , signer );
    nftnumber = await contract.getnumber()
    document.getElementById("NextNftNumber").innerHTML = `Next NFT Number : ${parseInt(nftnumber._hex) + 1}`;
    
}




// function addattribute(){
//     //console.log("attribute");
//     attributes_table = document.getElementById("attributes_table");
//     var row = attributes_table.insertRow(0);
//     var cell1 = row.insertCell(0);
//     var cell2 = row.insertCell(1);
//     var cell3 = row.insertCell(2);
//     cell1.innerHTML = "string";
//     cell2.innerHTML = document.getElementById("trait_type").value;
//     cell3.innerHTML = document.getElementById("value").value;
// };


// function set_nft_metadata_to_ipfs(){
//     metadatajson = {};
//     metadatajson.name = document.getElementById("name").value;
//     metadatajson.description = document.getElementById("description").value;
//     //metadatajson.image = "ipfs://" + document.getElementById("image").value;
//     metadatajson.image = "ipfs://" + "QmYnHs7qT4ok8RhZHCBqU7V6UauBZFFjAJVVvZnvBhaTEJ";
//     let attributes_length = document.getElementById("attributes_table").rows.length;
    
//     attrs = [];    
//     for (let i = 0 ; i < attributes_length ; i++ ){
//         _trait_type = document.getElementById("attributes_table").rows[i].cells[1].innerText;
//         // console.log(_trait_type)
//         _value = document.getElementById("attributes_table").rows[i].cells[2].innerText;
//         attrs.push({ "trait_type" : _trait_type , "value" : _value });
//         //console.log("a")        
//     } 

//     metadatajson.attributes = attrs;

//     metadatatext = JSON.stringify(metadatajson);
    
//     console.log(metadatatext);
    
//     //console.log(metadatajson);
// }

