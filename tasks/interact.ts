import { task } from 'hardhat/config'
import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { parseEther } from '@ethersproject/units'
import { getAddress } from '@zetachain/protocol-contracts'
import { prepareData, trackCCTX } from '@zetachain/toolkit/helpers'
import { BigNumber } from '@ethersproject/bignumber'

const main = async (args: any, hre: HardhatRuntimeEnvironment) => {
	const [signer] = await hre.ethers.getSigners()
	console.log(`🔑 Using account: ${signer.address}\n`)

	const targetZRC20 = getAddress('zrc20', args.destination)
	const minAmountOut = BigNumber.from('0')

	const data = prepareData(
		args.contract,
		['address', 'bytes32', 'uint256'],
		[targetZRC20, args.recipient, minAmountOut]
	)
	const to = getAddress('tss', hre.network.name as any)
	const value = parseEther(args.amount)

	const tx = await signer.sendTransaction({ data, to, value })

	console.log(`
🚀 Successfully broadcasted a token transfer transaction on ${hre.network.name} network.
📝 Transaction hash: ${tx.hash}
`)
	await trackCCTX(tx.hash)
}

task('interact', 'Interact with the contract', main)
	.addParam('contract', 'The address of the withdraw contract on ZetaChain')
	.addParam('amount', 'Amount of tokens to send')
	.addParam('recipient')
	.addParam('destination')
