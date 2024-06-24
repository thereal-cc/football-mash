export default function TeamCard({team}) {
  return (
    <div className="card card-compact w-96 shadow">
      <figure>
        <img src={team.logo} alt={team.name} width={245} height={245}/>
      </figure>
      <div className="card-body">
        <h2 className="text-center text-black font-bold text-lg">{team.name}</h2>
      </div>
    </div>
  )
}
