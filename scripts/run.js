const main = async () => {
	const [deployer] = await hre.ethers.getSigners();
	const accountBalance = await deployer.getBalance();

	console.log("Deploying contracts with account: ", deployer.address);
	console.log("Account balance: ", accountBalance.toString());

	const Token = await hre.ethers.getContractFactory("WavePortal");
	const waveContract = await Token.deploy({
		value: hre.ethers.utils.parseEther("0.1"),
	});
	await waveContract.deployed();

	console.log("WavePortal address: ", waveContract.address);

	/*
	 * Get Contract Balance
	 */
	let contractBalance = await hre.ethers.provider.getBalance(
		waveContract.address
	);
	console.log(
		"Contract balance: ",
		hre.ethers.utils.formatEther(contractBalance)
	);

	// Send wave
	let waveCount;
	waveCount = await waveContract.getTotalWave();
	console.log(waveCount.toNumber());

	let waveTxn = await waveContract.wave("First Message");
	await waveTxn.wait();

	// const [_, randomPerson] = await hre.ethers.getSigners();
	// waveTxn = await waveContract.connect(randomPerson).wave("Second Message)");
	waveTxn = await waveContract.wave("Second Message");
	await waveTxn.wait();

	contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
	console.log(
		"Contract balance: ",
		hre.ethers.utils.formatEther(contractBalance)
	);

	let allWaves = await waveContract.getAllWaves();
	console.log(allWaves);
};

const runMain = async () => {
	try {
		await main();
		process.exit(0);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

runMain();
