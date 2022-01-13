require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
	defaultNetwork: "hardhat",
	networks: {
		hardhat: {
			chainId: 1337,
			accounts: {
				mnemonic: process.env.MNEMONIC,
			},
		},
		rinkeby: {
			url: `https://rinkeby.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
			accounts: {
				mnemonic: process.env.MNEMONIC,
			},
			chainId: 4,
		},
	},
	solidity: {
		version: "0.8.0",
		settings: {
			optimizer: {
				enabled: true,
				runs: 200,
			},
		},
	},
};
