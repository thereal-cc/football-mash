import database from '../../lib/supabase.js';

// Function to generate a random team ID between 1 and 32
function getRandomTeamId() {
    return Math.floor(Math.random() * 32) + 1;
}

export async function get({ request }) {
    let randomTeam1 = getRandomTeamId();
    let randomTeam2 = getRandomTeamId();

    // Ensure randomTeam1 and randomTeam2 are not the same
    while (randomTeam1 === randomTeam2) {
        randomTeam2 = getRandomTeamId();
    }

    try {
        let team1 = await database.from('Teams').select().eq('id', randomTeam1);
        let team2 = await database.from('Teams').select().eq('id', randomTeam2);
        return new Response(JSON.stringify({ message: [team1.data[0], team2.data[0]] }), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ message: "Error fetching teams" }), { status: 500 });
    }
}
