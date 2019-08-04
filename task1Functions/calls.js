/*
*	Calls in a smart-contract, are generally functions that don't change the state.
*	This script has the following functions:
*	-	getSecondsFromGuards()					, retrieve a list with all the strored seconds (from Guards) 
*	-	getSecondFromGuard( uint256 timestamp ) , get information about a specific second (Guard entry)
* 	-	getSecondsFromSupervisor()				, retrieve a list with all the strored seconds (from Supervisors)
*	-	getSecondFromSupervisor( uint256 timestamp ) , get information about a specific second (Supervisor entry)
*/
var Task1Calls = {

	initialize : function()
	{
		console.log(" - Task 1 calls. ")
		Task1Calls.WalletProvider = require("truffle-wallet-provider");
		Task1Calls.Web3 = require('web3')
		var keystore = '{"address":"9f3fae30a8c0907a83aa15f4f32688c9c9b0b707","crypto":{"cipher":"aes-128-ctr","ciphertext":"f270483da2a7944c9642099b96f6a4086db574a5836e5b478d6880e3c35d5909","cipherparams":{"iv":"17f945bc50e129f6ddbcddfecbcbe870"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"2f0419e0ab3775cd31872a5cffb6c6b32ed5eef8f622d7ed64d950f02815bd86"},"mac":"4f648f805e84a7f07d37ac188e8f64de3630fa26f651e4a0a7706a253bdced4c"},"id":"ac55f51b-bef4-4096-95ac-6dd198009cb7","version":3}'
		var pass = "t6phost4m4*";
		var wallet = require('ethereumjs-wallet').fromV3(keystore, pass);
		var provider = new Task1Calls.WalletProvider(wallet, "https://rinkeby.infura.io/v3/07b06e4e587148a68c9cc836f97efb4f")
		Task1Calls.web3 = new Task1Calls.Web3(provider)
		console.log("- Web3 is set successfully.")
		const task1ContractAbi = require( "../smart-contracts/task1.js" )
		const task1ContractAddress = "0xa62ee4593f736f1ce10e5aa95a58b788f9fe70db" 
		Task1Calls.task1Contract = new Task1Calls.web3.eth.Contract( task1ContractAbi , task1ContractAddress )
	},

	getSecondsFromGuard : function()
	{
		// ---------------------------------------------------------------
		Task1Calls.task1Contract.methods.getSecondsFromGuards().call( {from:"0x9f3fae30a8c0907a83aa15f4f32688c9c9b0b707"} ).
		then( (data) => {
			console.log(" - Retrieved total seconds. ")
			console.log(data)
			Task1Calls.SecondsFromGuards = data
			if( data.length > 0 )
				Task1Calls.getSecondFromGuardInformation(0)
		})
		// ---------------------------------------------------------------
	},

	getSecondFromGuardInformation : function(secondCode)
	{
		// ---------------------------------------------------------------
		Task1Calls.task1Contract.methods.getSecondFromGuard( Task1Calls.SecondsFromGuards[secondCode] ).call( {from:"0x9f3fae30a8c0907a83aa15f4f32688c9c9b0b707"} ).
		then( (data) => {
			console.log(" - Retrieved info for: "+Task1Calls.SecondsFromGuards[secondCode])
			console.log(data)
			if( (secondCode+1) < Task1Calls.SecondsFromGuards.length )
				Task1Calls.getSecondFromGuardInformation((secondCode+1))
		})
		// ---------------------------------------------------------------
	}

}

module.exports = Task1Calls
