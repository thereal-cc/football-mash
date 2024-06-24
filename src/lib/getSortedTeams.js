import database from './supabase.js';

const sortedTeams = async () => {
    const {data, error} = await database.from('Teams').select().order('score', {ascending: false});
    if (error) {
        console.log(error);
        return [];
    }

    return data;
}

export default sortedTeams;