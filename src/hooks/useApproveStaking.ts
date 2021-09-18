import {useCallback} from 'react'

import useBio from './useBio'
import {useWallet} from 'use-wallet'
import {provider} from 'web3-core'
import {
  approve,
  getBioContract,
  getXBioStakingContract
} from '../bio/utils'

const useApproveStaking = () => {
  const {account}: { account: string; ethereum: provider } = useWallet()
  const bio = useBio()
  const lpContract = getBioContract(bio)
  const contract = getXBioStakingContract(bio)

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, contract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, lpContract, contract])

  return {onApprove: handleApprove}
}

export default useApproveStaking
