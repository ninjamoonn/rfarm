import React, { createContext, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'

import { Bio } from '../../bio'

export interface BioContext {
  bio?: typeof Bio
}

export const Context = createContext<BioContext>({
  bio: undefined,
})

declare global {
  interface Window {
    biosauce: any
  }
}

const BioProvider: React.FC = ({ children }) => {
  const { ethereum }: { ethereum: any } = useWallet()
  const [bio, setBio] = useState<any>()

  // @ts-ignore
  window.bio = bio
  // @ts-ignore


  useEffect(() => {
    if (ethereum) {
      const chainId = Number(ethereum.chainId)
      const bioLib = new Bio(ethereum, chainId, false, {
        defaultAccount: ethereum.selectedAddress,
        defaultConfirmations: 1,
        autoGasMultiplier: 1.5,
        testing: false,
        defaultGas: '6000000',
        defaultGasPrice: '1000000000000',
        accounts: [],
        ethereumNodeTimeout: 10000,
      })
      setBio(bioLib)
      window.biosauce = bioLib
    }
  }, [ethereum])

  return <Context.Provider value={{ bio }}>{children}</Context.Provider>
}

export default BioProvider
