const cron = require('node-cron');
const { startOfToday, endOfToday } = require('date-fns');

const { ScheduleRepository } = require('../repositories');
const { ScheduleService } = require('../services');

const scheduleService = new ScheduleService(new ScheduleRepository());

const job = cron.schedule('*/2 * * * *', async () => {
    try {
        const now = new Date();
        const todayStart = startOfToday();
        const todayEnd = endOfToday();

        await scheduleService.updateTestStatus(todayStart, todayEnd, now);
    } catch (error) {
        console.log(error);
    }
});

module.exports = job;