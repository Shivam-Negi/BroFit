const CrudRepository = require('./crud-repository');
const Noti = require('../models/noti');

class NotiRepository extends CrudRepository {
    constructor() {
        super(Noti);
    }

    async getAllNoti(gymId) {
        const notis = await Noti.find({
            gymId: gymId,
            target: 'all'
        });
        return notis;
    }

    async getNotiSpec(gymId, userId) {
        const noti = await Noti.find({
            gymId: gymId,
            userId: userId,
            target: 'specific'
        });
        return noti;
    }
}

module.exports = NotiRepository;