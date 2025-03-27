export default function CandidateList({ contract }) {
  const [candidates, setCandidates] = useState([])

  useEffect(() => {
    const loadCandidates = async () => {
      setCandidates(await contract.getCandidates())
    }
    contract && loadCandidates()
  }, [contract])

  const handleVote = async (id) => {
    await contract.vote(id)
    setCandidates(await contract.getCandidates())
  }

  return (
    <div>
      <h2>Candidates</h2>
      {candidates.map((c, i) => (
        <div key={i}>
          {c.name} - Votes: {c.voteCount}
          <button onClick={() => handleVote(i)}>Vote</button>
        </div>
      ))}
    </div>
  )
}