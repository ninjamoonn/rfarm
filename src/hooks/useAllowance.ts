import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import useBio from './useBio'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import { getAllowance } from '../utils/erc20'
import { getScienTistContract } from '../bio/utils'

const useAllowance = (lpContract: Contract) => {
  const [allowance, setAllowance] = useState(new BigNumber(0))
  const { account }: { account: string; ethereum: provider } = useWallet()
  const bio = useBio()
  const scienTistContract = getScienTistContract(bio)

  const fetchAllowance = useCallback(async () => {
    const allowance = await getAllowance(
      lpContract,
      account,
      scienTistContract.options.address,
    )
    setAllowance(new BigNumber(allowance))
  }, [account, scienTistContract, lpContract])

  useEffect(() => {
    if (account && scienTistContract && lpContract) {
      fetchAllowance()
    }
    let refreshInterval = setInterval(fetchAllowance, 10000)
    return () => clearInterval(refreshInterval)
  }, [account, scienTistContract, lpContract])

  return allowance
}

export default useAllowance
