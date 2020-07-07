const queryString = require('query-string');
const BattleModel = require('../models/battles');

exports.battleList = async (req, res, next) => {
    try {
        const battles = await BattleModel.find().select('location -_id');
        const locations = battles.map((battle) => battle.location);
        res.send(locations);
    } catch (error) {
        console.error(error);
    }
};

exports.battleCount = async (req, res, next) => {
    try {
        const battleCount = await BattleModel.countDocuments();
        res.send(battleCount);
    } catch (error) {
        console.error(error);
    }
};

exports.battleSearch = async (req, res, next) => {
    try {
        const {query: queries} = queryString.parseUrl(req.url);
        const {location, type, ...rest} = queries;
        let orCondition;
        if (queries.king) {
            orCondition = [
                {attacker_king: queries.king},
                {defender_king: queries.king},
            ];
        }
        const conditions = {
            $or: orCondition,
            location: location,
            battle_type: type,
        };
        Object.keys(conditions).forEach((key) => {
            if (!conditions[key]) {
                delete conditions[key];
            }
        });
        const battles = await BattleModel.find(conditions);
        res.send(battles);
    } catch (error) {
        console.error(error);
    }
};
