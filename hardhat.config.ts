import './tasks/interact'
import './tasks/deploy'
import './tasks/swap'
import './tasks/message'
import '@nomicfoundation/hardhat-toolbox'
import { getHardhatConfigNetworks } from '@zetachain/networks'
import '@zetachain/toolkit/tasks'
import { HardhatUserConfig } from 'hardhat/config'

const config: HardhatUserConfig = {
	solidity: {
		compilers: [{ version: '0.6.6' /** For uniswap v2 */ }, { version: '0.8.7' }],
	},
	networks: {
		...getHardhatConfigNetworks(),
	},
}

export default config
