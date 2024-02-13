import { pool } from './db.js'


export const getUserdata = async(req,res,next) => {
try {
    const data = await pool.query(
        `SELECT date,sleep_time,wake_time,sleep_duration FROM sleep_data WHERE user_id=$1 ORDER BY date DESC LIMIT $2`,
        [req.userId,req.query.limit||7]);
    res.status(200).json({
        data:data.rows
    })
} catch (error) {
    console.log(error);
    res.status(400).json({error:"invalid user"});
}
}


export const addUserdata = async(req,res,next) => {
try {
    const data = await pool.query(
        `INSERT INTO sleep_data(date, sleep_time, wake_time, sleep_duration, user_id) VALUES ($1,$2,$3,$4,$5) returning id, date,sleep_time,wake_time,sleep_duration`,
        [req.body.date, req.body.sleep_time, req.body.wake_time, req.body.sleep_duration, req.userId]);
    res.status(201).json({data:data})
} catch (error) {
    console.log(error);
    res.status(400).json(error);
}
}

export const updateUserdata = async(req,res,next) => {
    try {
        const data = await pool.query(
            `UPDATE sleep_data SET date=$1, sleep_time=$2, wake_time=$3, sleep_duration=$4 WHERE id=$5 returning date,sleep_time,wake_time,sleep_duration id`,
            [req.body.date, req.body.sleep_time, req.body.wake_time, req.body.sleep_duration, req.params.id]);
        res.status(200).json({data:data.rows[0]})
    } catch (error) {
        res.status(404).json(error);
        console.log(error);
    }
    }


export const deleteUserdata = async(req,res,next) => {
    try {
        const data = await pool.query(
            `DELETE FROM sleep_data WHERE id=$1 AND user_id=$2`,
            [req.params.id, req.userId]);
        res.status(204).json({status:'success'})
    } catch (error) {
        console.log(error);
        res.status(404).json(error);
    }
    }

