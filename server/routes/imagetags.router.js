const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:id', (req,res) => {
    console.log(req.params.id);
    let query = `SELECT * FROM "tags"
    JOIN "images_tags" ON images_tags.tags_id = tags.id
    WHERE "images_tags".images_id = $1;`;
    pool.query(query,[req.params.id])
        .then( (result) => {
            res.send(result.rows);
        })
        .catch( (error) => {
            console.log(`Error on query ${error}`);
            res.sendStatus(500);
        })
}
)
 
router.post('/',async (req, res) => {
    console.log('Imagetag POST with', req.body);
    const client = await pool.connect();
    try {
        const {
        selectedImage,
        tags_id,
        images_id
        } = req.body;
        console.log([tags_id])
        console.log([images_id])
        await client.query('BEGIN')
        await client.query (`INSERT INTO "images_tags" ("images_id", "tags_id")
        VALUES ($1, $2)`, [images_id,tags_id]);
        await client.query('COMMIT')
        res.sendStatus(201);
    } catch (error) {
        await client.query('ROLLBACK')
        console.log('Error POST /imagetags', error);
        res.sendStatus(500);
    } finally {
        client.release()
    }
    
}); // END Route

router.delete('/:id', (req, res) => {
    console.log('delete this',req.params.id)
    let sqlQuery = `
        DELETE FROM "images_tags"
        WHERE "tags_id" = $1;
    `
    pool.query(sqlQuery, [req.params.id])
    .then((result) => {
        console.log('response from DELETE route:', result);
        res.sendStatus(200);
    }).catch((error) => {
        console.log('error in DELTE route:', error);
        res.sendStatus(500);
    });
})

module.exports = router;