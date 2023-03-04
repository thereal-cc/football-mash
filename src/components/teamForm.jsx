import { useState, useEffect } from 'react';
import TeamCard from './teamCard';

export default function TeamForm() {
  // Teams
  const [team1, setTeam1] = useState([]);
  const [team2, setTeam2] = useState([]);

  // Who won?
  const [winner, setWinner] = useState('');

  // Get team data from API
  const getTeams = async () => {
    const response = await fetch('/api/getTeams', {
      method: 'GET',
    });

    const data = await response.json();

    if (response.status != 200) {
      return <div>Error: {response.message} </div>
    }

    setTeam1(data.message[0]);
    setTeam2(data.message[1]);
  }
  
  // Get team data on page load
  useEffect(() => {
    if (team1.length == 0 || team2.length == 0) {
      getTeams();
    }
  }, []);

  const handleSubmit = async (event, buttonName) => {
    event.preventDefault();
    setWinner(buttonName);

    const response = await fetch('/api/adjustScore', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        team1: team1,
        team2: team2,
        winner: winner,
      })
    });

    const data = await response.json();

    if (data.message != "Success") {
      return <div>Error: {data.message} </div>
    }

    setWinner('');
    getTeams();
  }

  return (
    <div className="flex flex-col w-full lg:flex-row justify-center items-center mt-4 pb-24">
      <button type="submit" name="Team1" onClick={(e) => handleSubmit(e, 'Team1')}>
        <TeamCard team={team1}/>
      </button>
      <div className="divider text-2xl font-bold text-black lg:divider-horizontal">OR</div>
      <button type="submit" name="Team2" onClick={(e) => handleSubmit(e, 'Team2')}>
        <TeamCard team={team2}/>
      </button>
    </div>
  );
}