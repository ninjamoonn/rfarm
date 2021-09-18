import { useContext } from 'react'
import { Context } from '../contexts/BioProvider'

const useBio = () => {
  const { bio } = useContext(Context)
  return bio
}

export default useBio
