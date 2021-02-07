// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { MongoClient } from 'mongodb';
import { getDbClient } from "../../util/mongodb";
import { NextApiRequest, NextApiResponse } from "next"
import jwt from 'jsonwebtoken'
import { User } from '../../models/user-schema'

export default async function (req: NextApiRequest, res: NextApiResponse) {
    try {
        console.log(req.body);
        const user: User = req.body;
        const dbClient: MongoClient = await getDbClient();
        let result = await dbClient.db('links').collection('user').findOne({ email: user.email })

        if (!result) {
            res.status(404).json("User not found")
        }

        //To do: check password with the hashed value

        delete result['password'];

        const token = await jwt.sign({result}, process.env.JWT_SECRET || '');
        res.json({token});

    } catch (err) {
        console.log(err);
        res.status(500).send({
            "message": "Internal Server Error",
            "err": err
        })
    }
}
