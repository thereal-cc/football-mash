// src/pages/api/getTeams.js (or .ts)

import database from '../../lib/supabase.js';

function getRandomTeamId() {
    return Math.floor(Math.random() * 32) + 1;
}

export async function GET({ request }) {
    let randomTeam1 = getRandomTeamId();
    let randomTeam2 = getRandomTeamId();

    while (randomTeam1 === randomTeam2) {
        randomTeam2 = getRandomTeamId();
    }

    try {
        const team1 = await database.from('Teams').select().eq('id', randomTeam1);
        const team2 = await database.from('Teams').select().eq('id', randomTeam2);
        return new Response(JSON.stringify({ message: [team1.data[0], team2.data[0]] }), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: "Error fetching teams" }), { status: 500 });
    }
}