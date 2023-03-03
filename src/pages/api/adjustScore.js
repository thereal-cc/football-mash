import database from '../../lib/supabase.js';
import eloRating from 'elo-rating';

export async function post({request}) {
    try {
        // Get Teams and Calculate Scores
        const {team1, team2, winner} = await request.json();
        const result = eloRating.calculate(team1.score, team2.score, winner);

        // Add Scores to Database
        await database.from('Teams').update({score: result.playerRating}).eq('id', team1.id);
        await database.from('Teams').update({score: result.opponentRating}).eq('id', team2.id);

        // Return Success
        return new Response(JSON.stringify({message: "Success"}), {status: 200});
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({message: "Error: Submission Didn't Go Through"}), {status: 500});
    }
}