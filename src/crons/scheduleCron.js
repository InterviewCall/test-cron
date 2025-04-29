const cron = require('node-cron');

const { ScheduleRepository } = require('../repositories');
const { ScheduleService } = require('../services');

const scheduleService = new ScheduleService(new ScheduleRepository());

const job = cron.schedule('* * * * *', async () => {
    try {
        const now = new Date();
        await scheduleService.updateTestStatus(now);
    } catch (error) {
        console.log(error);
    }
});

module.exports = job;