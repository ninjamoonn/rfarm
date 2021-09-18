import { useCallback } from 'react'
import { useWallet } from 'use-wallet'
import { Contract } from 'web3-eth-contract'
import { redeem } from '../bio/utils'

const useRedeem = (scienTistContract: Contract) => {
  const { account } = useWallet()

  const handleRedeem = useCallback(async () => {
    const txHash = await redeem(scienTistContract, account)
    console.log(txHash)
    return txHash
  }, [account, scienTistContract])

  return { onRedeem: handleRedeem }
}

export default useRedeem
