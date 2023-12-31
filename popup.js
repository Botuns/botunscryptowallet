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

        const data = {
            name:name,
            email:email,
            password:password,
            passwordConfirm:passwordConfirm,
            address: wallet.address,
            private_key : wallet.privateKey,
            mnemonic : wallet.mnemonic.phrase
        }

        fetch(url,{
            method: 'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
        }).then((response)=> response.json()).then((result)=>{
            document.getElementById("createdAddress").innerHTML= wallet.address
            document.getElementById("createdPrivateKey").innerHTML= wallet.privateKey
            document.getElementById("createdMneumonic").innerHTML= wallet.mnemonic
            document.getElementById("center").style.display= "none"
            document.getElementById("accountData").style.display= "block"
            document.getElementById("sign_up").style.display= "none"


            const userWallet = {
                address:wallet.address,
                private_key: wallet.privateKey,
                mnemonic: wallet.mnemonic.phrase,
            }

            const jsonObj = JSON.stringify(userWallet);
            localStorage.setItem("userWallet",jsonObj);


            document.getElementById("goHomePage").style.display = "block";
            window.location.reload();



        }).catch((error)=>{
            console.log(error)
        })
    }



};
function login(){
    document.getElementById("login_form").style.display= "none"
    document.getElementById("center").style.display= "block"

    const email = document.getElementById("login_email").value
    const password = document.getElementById("login_password").value 

    // api call
    const url = 'http://localhost:3000/api/v1/user/login';

    const data = {
        email: email,
        password:password
    }

    fetch(url, {
        method:'POST',
        handlers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)

    }).then((response)=>response.json()).then((result)=>{
        console.log(result)
        const userWallet = {
            address: result.data.address,
            private_key:result.data.user.private_key,
            mnemonic:result.data.user.mneumonic,
        };
        const jsonObj = JSON.stringify(userWallet);
        localStorage.setItem('userWallet',jsonObj);
        window.location.reload()
    }).catch((error)=>{
        console.log(error)
    });


};
function logout(){
    localStorage.removeItem('userWallet');
    window.location.reload();
};
function openTransfer(){
    document.getElementById("transfer_from").style.display= 'block';
    document.getElementById("home").style.display = 'none';

};
function goBack(){
    document.getElementById("transfer_from").style.display= 'none';
    document.getElementById("home").style.display = 'block';
};
function openImport(){
    document.getElementById("import_token").style.display= 'block';
    document.getElementById("home").style.display = 'none';
    
};
function importGoBack(){
    document.getElementById("import_token").style.display= 'none';
    document.getElementById("home").style.display = 'block';
};
function openActivities(){
    document.getElementById("activity").style.display= 'block';
    document.getElementById("assets").style.display = 'none';
};
function openAssets(){
    document.getElementById("activity").style.display= 'none';
    document.getElementById("assets").style.display = 'block';
};
function goHomePage(){
    document.getElementById("create_popUp").style.display= 'none';
    document.getElementById("home").style.display = 'block';
};
function openImoprtModal(){
    document.getElementById("import_account").style.display= 'block';
    document.getElementById("home").style.display = 'none';
};
function closeImportModal(){
    document.getElementById("import_account").style.display= 'none';
    document.getElementById("home").style.display = 'block';
};
function addToken(){
    const address = document.getElementById("token_address").value
    const name = document.getElementById("name").value
    const symbol = document.getElementById("token_symbol").value

    // api call;;;
    const url = 'http://localhost:3000/api/v1/tokens/createtoken'
    // obj data
    const data= {
        name: name,
        address: address,
        symbol: symbol
    };
    fetch(url,{
        method:'POST',
        handlers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    }).then((response)=>response.json()).then((result)=>{
        console.log(result)
        window.location.reload();
    }).catch((error)=>{
        console.log('ERROR',error);
    });

};
function addAccount(){
    const private_key= document.getElementById("add_account_private_key").value

    const provider = new ethers.providers.JsonRpcApiProvider(providerURL);
    let wallet = new ethers.Wallet(private_key,provider)
    console.log(wallet);
    const url ='http://localhost:3000/api/v1/account/cretaeaccount'

    const data = {
        privateKey: private_key,
        address:wallet.address,
    }
    fetch(url,{
        method:'POST',
        handlers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    }).then((response)=>response.json()).then((result)=>{
        console.log(result)
        window.location.reload();
    }).catch((error)=>{
        console.log('ERROR',error);
    });
};
function myFunction(){
    const str = localStorage.getItem('userWallet');
    const parsedObj = JSON.parse(str);
    if(parsedObj && parsedObj.address){
        document.getElementById('LoginUser').style.display = 'none';
        document.getElementById('home').style.display = 'block';

        privateKey = parsedObj.private_key;
        address = parsedObj.address;

        checkBalance(parsedObj.address);


    }

    const tokenRender = document.querySelector(".assets");
    const accountRender = document.querySelector(".accountList");

    const url ='http://localhost:3000/api/v1/tokens/alltokens'

    fetch(url).then((response)=>response.json()).then((data)=>{
        let elements = "";
        data.data.tokens.map((token)=>{
            elements =+ `
            <div class= "asset_item">

            <img class="assets_item_img"
            src = "./assets/theblockchaincoders.png"
            alt=""
             />
             <span> ${token.address.slice(0,15)}...</span>
             <span> ${token.symbol.slice(0,15)}...</span>

            </div>
            `
        })
        tokenRender.innerHTML = elements
    }).catch((error)=>{
        console.log(error);
    });
    fetch('http://localhost:3000/api/v1/account/allaccount').then((response)=>response.json()).then((data)=>{
        let accounts = "";
        data.data.accounts.map((account,i)=>{
            account +=
            `
            <div class="lists">
            <p>${i+1}</p>
            <p class="accountValue" data-address= ${account.address} data-privateKey=${account.privateKey}>${account.address.slice(0,25)}...</p>
            </div>
            `
        })
        accountRender.innerHTML=accounts
    }).catch((error)=>{
        console.log(error);
    })




};
function copyAddress(){
    navigator.clipboard.writeText(address)
};
function changeAccount(){
    const data = document.querySelector(".accountValue")
    const address = data.getAttribute("data-address");
    const privateKey = data.getAttribute("data-privateKey")

    console.log(privateKey,address);

    const userWallet ={
        address:address,
        private_key:privateKey,
        mnemonic:"Changed",
    }
    const jsonObj = JSON.stringify(userWallet)
    localStorage.setItem("userWallet",jsonObj)
    window.location.reload()
};





window.onload= myFunction 


