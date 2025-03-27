'use client'
import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import ConnectWallet from '../components/ConnectWallet'
import CandidateList from '../components/CandidateList'

export default function Home() {
  const [contract, setContract] = useState(null)
  const [account, setAccount] = useState('')

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
        const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
        const abi = [/* Paste your contract ABI here */]
        setContract(new ethers.Contract(contractAddress, abi, signer))
        setAccount((await provider.listAccounts())[0])
      }
    }
    init()
  }, [])

  return (
    <main>
      {account ? <CandidateList contract={contract} /> : <ConnectWallet />}
    </main>
  )
}