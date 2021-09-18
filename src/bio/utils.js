import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const GAS_LIMIT = {
  STAKING: {
    DEFAULT: 200000,
    SNX: 850000,
  },
}

export const getScienTistAddress = (bio) => {
  return bio && bio.scienTistAddress
}
export const getBioAddress = (bio) => {
  return bio && bio.bioAddress
}
export const getWethContract = (bio) => {
  return bio && bio.contracts && bio.contracts.weth
}

export const getScienTistContract = (bio) => {
  return bio && bio.contracts && bio.contracts.scienTist
}
export const getBioContract = (bio) => {
  return bio && bio.contracts && bio.contracts.bio
}

export const getXBioStakingContract = (bio) => {
  return bio && bio.contracts && bio.contracts.xBioStaking
}

export const getFarms = (bio) => {
  return bio
    ? bio.contracts.pools.map(
        ({
          pid,
          name,
          symbol,
          icon,
          tokenAddress,
          tokenSymbol,
          tokenContract,
          lpAddress,
          lpContract,
        }) => ({
          pid,
          id: symbol,
          name,
          lpToken: symbol,
          lpTokenAddress: lpAddress,
          lpContract,
          tokenAddress,
          tokenSymbol,
          tokenContract,
          earnToken: 'bio',
          earnTokenAddress: bio.contracts.bio.options.address,
          icon,
        }),
      )
    : []
}

export const getPoolWeight = async (scienTistContract, pid) => {
  const { allocPoint } = await scienTistContract.methods.poolInfo(pid).call()
  const totalAllocPoint = await scienTistContract.methods
    .totalAllocPoint()
    .call()
  return new BigNumber(allocPoint).div(new BigNumber(totalAllocPoint))
}

export const getEarned = async (scienTistContract, pid, account) => {
  return scienTistContract.methods.pendingBio(pid, account).call()
}

export const getTotalLPWethValue = async (
  scienTistContract,
  wethContract,
  lpContract,
  tokenContract,
  pid,
) => {
  // Get balance of the token address
  const tokenAmountWholeLP = await tokenContract.methods
    .balanceOf(lpContract.options.address)
    .call()
  const tokenDecimals = await tokenContract.methods.decimals().call()
  // Get the share of lpContract that scienTistContract owns
  const balance = await lpContract.methods
    .balanceOf(scienTistContract.options.address)
    .call()
  // Convert that into the portion of total lpContract = p1
  const totalSupply = await lpContract.methods.totalSupply().call()
  // Get total weth value for the lpContract = w1
  const lpContractWeth = await wethContract.methods
    .balanceOf(lpContract.options.address)
    .call()
  // Return p1 * w1 * 2
  const portionLp = new BigNumber(balance).div(new BigNumber(totalSupply))
  const lpWethWorth = new BigNumber(lpContractWeth)
  const totalLpWethValue = portionLp.times(lpWethWorth).times(new BigNumber(2))
  // Calculate
  const tokenAmount = new BigNumber(tokenAmountWholeLP)
    .times(portionLp)
    .div(new BigNumber(10).pow(tokenDecimals))

  const wethAmount = new BigNumber(lpContractWeth)
    .times(portionLp)
    .div(new BigNumber(10).pow(18))
  return {
    tokenAmount,
    wethAmount,
    totalWethValue: totalLpWethValue.div(new BigNumber(10).pow(18)),
    tokenPriceInWeth: wethAmount.div(tokenAmount),
    poolWeight: await getPoolWeight(scienTistContract, pid),
  }
}

export const approve = async (lpContract, scienTistContract, account) => {
  return lpContract.methods
    .approve(scienTistContract.options.address, ethers.constants.MaxUint256)
    .send({ from: account })
}

export const approveAddress = async (lpContract, address, account) => {
  return lpContract.methods
      .approve(address, ethers.constants.MaxUint256)
      .send({ from: account })
}

export const getBioSupply = async (bio) => {
  return new BigNumber(await bio.contracts.bio.methods.totalSupply().call())
}

export const getXBioSupply = async (bio) => {
  return new BigNumber(await bio.contracts.xBioStaking.methods.totalSupply().call())
}

export const stake = async (scienTistContract, pid, amount, account) => {
  return scienTistContract.methods
    .deposit(
      pid,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const unstake = async (scienTistContract, pid, amount, account) => {
  return scienTistContract.methods
    .withdraw(
      pid,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}
export const harvest = async (scienTistContract, pid, account) => {
  return scienTistContract.methods
    .deposit(pid, '0')
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const getStaked = async (scienTistContract, pid, account) => {
  try {
    const { amount } = await scienTistContract.methods
      .userInfo(pid, account)
      .call()
    return new BigNumber(amount)
  } catch {
    return new BigNumber(0)
  }
}

export const redeem = async (scienTistContract, account) => {
  let now = new Date().getTime() / 1000
  if (now >= 1597172400) {
    return scienTistContract.methods
      .exit()
      .send({ from: account })
      .on('transactionHash', (tx) => {
        console.log(tx)
        return tx.transactionHash
      })
  } else {
    alert('pool not active')
  }
}

export const enter = async (contract, amount, account) => {
  //debugger
  return contract.methods
      .enter(
          new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
      )
      .send({ from: account })
      .on('transactionHash', (tx) => {
        console.log(tx)
        return tx.transactionHash
      })
}

export const leave = async (contract, amount, account) => {
  return contract.methods
      .leave(
          new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
      )
      .send({ from: account })
      .on('transactionHash', (tx) => {
        console.log(tx)
        return tx.transactionHash
      })
}
