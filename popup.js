import { ethers } from "ethers"
document.addEventListener('DOMContentLoaded',function(){
    // to target elements here:
    document.getElementById("accountList").addEventListener('click',changeAccount)
    document.getElementById("userAddress").addEventListener('click',copyAddress)
    document.getElementById("accountList").addEventListener('click',changeAccount)
    document.getElementById("transferFund").addEventListener('click',handler)
    document.getElementById("header_network").addEventListener('click',getOpenNetWork)
    document.getElementById("network_item").addEventListener('click',getSelectedNetwork)
    document.getElementById("add_network").addEventListener('click',setNetwork)
    document.getElementById("loginAccount").addEventListener('click',loginUser)
    document.getElementById("accountCreate").addEventListener('click',createUser)
    document.getElementById("openCreate").addEventListener('click',openCreate)
    document.getElementById("sign_up").addEventListener('click',signUp)
    document.getElementById("login_up").addEventListener('click',login)
    document.getElementById("logout").addEventListener('click',logout)
    document.getElementById("open_transfer").addEventListener('click',openTransfer)
    document.getElementById("open_asset").addEventListener('click',openAssets)
    document.getElementById("open_activity").addEventListener('click',openActivities)
    document.getElementById("openAccountImport").addEventListener('click',openImoprtModal)
    document.getElementById("close_import_account").addEventListener('click',this.close)
    document.getElementById("add_new_token").addEventListener('click',addToken)
    document.getElementById("add_new_Account").addEventListener('click',addAccount)






})

//  state variables
// ehter : https://eth-mainnet.g.alchemy.com/v2/aiNNPk3EY-HNElee8nbvQ7jcXZ9XwgkI
let providerURL ='https://polygon-mumbai.g.alchemy.com/v2/lRRkOwGVYoTiIjcpdVv-8WaiWeIr-cdi';

// let provider;
let privateKey;
let address;

// functions

function handler(){
    document.getElementById('transfer_center').style.display='flex'
    const amount = document.getElementById('amount').value;
    const address = document.getElementById('address').value;
    const private_key = 'ff4481f7181c0e0cb32e864c69d2ea54437eb0731ab0252c3e9a3e46e92ec70c'
    const testAccount = '0x27777708442f9e0ec7a806661e5e4A0a740CC415'

//  =>
    // provider:
    const provider = new ethers.JsonRpcApiProvider(providerURL);

    let wallet = new ethers.Wallet(privateKey,provider)
    const tx = {
        to: address,
        value:ethers.utils.parseEther(amount)
    }
    let a = document.getElementById("link");
    a.href= 'some-link'
    wallet.sendTransaction(tx).then((txobj)=>{
        console.log("tx obj" + txobj.hash)
        document.getElementById('transaction_center').style.display='none'
        const a = document.getElementById('link')
                document.getElementById('link').style.display='block'


    })

};

function checkBalance(){
    const provider = new ethers.providers.JsonRpcApiProvider(providerURL)

    provider.getBalance(address).then((balance)=>{
        const balanceInEth = ethers.utils.formatEther(balance);
        document.getElementById('accountBalance').innerHTML= `${balanceInEth} MATIC`

        document.getElementById('userAddress').innerHTML= `${address.slice(0,15)}....`
    })
};
function getOpenNetWork(){
    document.getElementById("network").style.display='block'
};
function getSelectedNetwork(e){
const element = document.getElementById("selected_network");
element.innerHTML= e.target.innerHTML;


if(e.target.innerHTML ==="Ethereum Mainnet"){
    providerURL='https://eth-mainnet.g.alchemy.com/v2/aiNNPk3EY-HNElee8nbvQ7jcXZ9XwgkI'

    document.getElementById('network').style.display='none'
}
else if(e.target.innerHTML==="Polygon Mainnet"){
    providerURL = 'https://rpc.ankr.com/polygon'

    document.getElementById('network').style.display='none'

}
else if(e.target.innerHTML==="Polygon Mumbai"){
    providerURL = 'https://polygon-mumbai.g.alchemy.com/v2/lRRkOwGVYoTiIjcpdVv-8WaiWeIr-cdi'

    document.getElementById('network').style.display='none'

}else if(e.target.innerHTML==="Goerli Test Network"){
    providerURL = 'https://rpc.ankr.com/eth_goerli'

    document.getElementById('network').style.display='none'

}
else if(e.target.innerHTML==="Sepolia Test Network"){
    providerURL = 'https://rpc.ankr.com/eth_sepolia'

    document.getElementById('network').style.display='none'

}
console.log(providerURL)
};
function loginUser(){
document.getElementById("createAccount").style.display= "none"
document.getElementById("LoginUser").style.display= "block"


};
function createUser(){
    document.getElementById("LoginUser").style.display= "none"
    document.getElementById("createAccount").style.display= "block"
};
function setNetwork(){
    document.getElementById('network').style.display="none"
};
function openCreate(){
    document.getElementById("createAccount").style.display= "none"
document.getElementById("create_popUp").style.display= "block"
};
function signUp(){
    const name = document.getElementById("sign_up_name").value
    const email = document.getElementById("sign_up_email").value
    const password = document.getElementById("sign_up_password").value
    const passwordConfirm = document.getElementById("sign_up_passwordConfirm").value
    // const name = document.getElementById("sign_up_name").value
    document.getElementById("field").style.display = "none"
    document.getElementById("center").style.display = "block"

    const wallet = ethers.Wallet.createRandom();
    if(wallet.address){
        console.log(wallet)

        // api call --->>>

        const url = 'http://localhost:3000/api/v1/user/signup'
    }



};
function login(){};
function logout(){};
function openTransfer(){};
function goBack(){};
function openImport(){};
function importGoBack(){};
function openActivities(){};
function openAssets(){};
function goHome(){};
function openImoprtModal(){};
function closeImportModal(){};
function addToken(){};
function addAccount(){};
function myFunction(){};
function copyAddress(){};
function changeAccount(){};









