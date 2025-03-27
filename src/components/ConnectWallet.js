export default function ConnectWallet() {
    const connect = async () => {
      try {
        if (window.ethereum) {
          await window.ethereum.request({ method: 'eth_requestAccounts' })
        } else {
          alert('Please install MetaMask!')
        }
      } catch (error) {
        console.error("Error connecting:", error)
      }
    }
  
    return (
      <div className="text-center py-8">
        <button 
          onClick={connect}
          className="btn btn-primary"
        >
          Connect Wallet
        </button>
      </div>
    )
  }