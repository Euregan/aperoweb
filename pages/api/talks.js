import { talks } from '../../lib/airtable';

export default async (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    talks()
        .then(talks => {
            res.statusCode = 200;
            res.end(JSON.stringify(talks));
        })
        .catch(error => {
            res.statusCode = 500;
            res.end(JSON.stringify(error));
        });
};
