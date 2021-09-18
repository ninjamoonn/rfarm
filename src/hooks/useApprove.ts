import { useCallback } from 'react'

import useBio from './useBio'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import { approve, getScienTistContract } from '../bio/utils'

const useApprove = (lpContract: Contract) => {
  const { account }: { account: string; ethereum: provider } = useWallet()
  const bio = useBio()
  const scienTistContract = getScienTistContract(bio)

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, scienTistContract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, lpContract, scienTistContract])

  return { onApprove: handleApprove }
}

export default useApprove
