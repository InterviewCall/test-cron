const { ScheduleModel } = require('../models');

class ScheduleRepository {
    constructor() {
        this.scheduleModel = ScheduleModel;
    }

    async updateTestStatus(currentTime) {
        await this.scheduleModel.updateMany({
            testStatus: { $in: ['Invited', 'In-Progress'] },
            endTime: { $lt: currentTime }
        }, {
            $set: { testStatus: 'Expired' }
        });
    }
}

module.exports = ScheduleRepository;