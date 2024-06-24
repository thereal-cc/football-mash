import database from '../../lib/supabase.js';

export async function get({request}) {
    let randomTeam1 = Math.floor(Math.random() * 32) + 1;
    let randomTeam2 = Math.floor(Math.random() * 32) + 1;

    while (randomTeam1 === randomTeam2) {
        randomTeam2 = Math.floor(Math.random() * 32) + 1;
    }

    try {
        let team1 = await database.from('Teams').select().eq('id', randomTeam1);
        let team2 = await database.from('Teams').select().eq('id', randomTeam2);
        return new Response(JSON.stringify({message: [team1.data[0], team2.data[0]]}), {status: 200});
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({message: "Error sending email"}), {status: 500});
    }
}