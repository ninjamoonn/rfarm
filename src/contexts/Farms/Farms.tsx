import React, { useCallback, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'
import useBio from '../../hooks/useBio'

import { bnToDec } from '../../utils'
import { getScienTistContract, getEarned } from '../../bio/utils'
import { getFarms } from '../../bio/utils'

import Context from './context'
import { Farm } from './types'

const Farms: React.FC = ({ children }) => {
  const [unharvested, setUnharvested] = useState(0)

  const bio = useBio()
  const { account } = useWallet()

  const farms = getFarms(bio)

  return (
    <Context.Provider
      value={{
        farms,
        unharvested,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Farms
