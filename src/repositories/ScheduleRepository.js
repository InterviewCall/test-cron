const { ScheduleModel } = require('../models');

class ScheduleRepository {
    constructor() {
        this.scheduleModel = ScheduleModel;
    }

    async updateTestStatus(todayStart, todayEnd, currentTime) {
        await this.scheduleModel.updateMany({
            testStatus: { $in: ['Invited', 'In-Progress'] },
            dateOfTest: { $gte: todayStart, $lt: todayEnd },
            endTime: { $lt: currentTime }
        }, {
            $set: { testStatus: 'Expired' }
        });
    }
}

module.exports = ScheduleRepository;