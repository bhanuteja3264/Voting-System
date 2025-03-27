import { useState } from 'react'

export default function OwnerControls({
  contract,
  account,
  refreshData
}) {
  const [newCandidate, setNewCandidate] = useState('')
  const [voterAddress, setVoterAddress] = useState('')
  const [loading, setLoading] = useState(false)

  const addCandidate = async () => {
    if (!contract || !newCandidate.trim()) return
    try {
      setLoading(true)
      const tx = await contract.addCandidate(newCandidate)
      await tx.wait()
      setNewCandidate('')
      refreshData()
    } catch (error) {
      console.error("Error adding candidate:", error)
    } finally {
      setLoading(false)
    }
  }

  const authorizeVoter = async () => {
    if (!contract || !voterAddress.trim()) return
    try {
      setLoading(true)
      const tx = await contract.authorizeVoter(voterAddress)
      await tx.wait()
      setVoterAddress('')
      refreshData()
    } catch (error) {
      console.error("Error authorizing:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mb-8 p-4 bg-base-200 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Owner Controls</h2>
      
      <div className="mb-4">
        <label>Add Candidate</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={newCandidate}
            onChange={(e) => setNewCandidate(e.target.value)}
            className="input input-bordered flex-1"
            placeholder="Candidate name"
          />
          <button
            onClick={addCandidate}
            disabled={loading}
            className="btn btn-primary"
          >
            Add
          </button>
        </div>
      </div>

      <div>
        <label>Authorize Voter</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={voterAddress}
            onChange={(e) => setVoterAddress(e.target.value)}
            className="input input-bordered flex-1"
            placeholder="0x..."
          />
          <button
            onClick={authorizeVoter}
            disabled={loading}
            className="btn btn-primary"
          >
            Authorize
          </button>
        </div>
      </div>
    </div>
  )
}