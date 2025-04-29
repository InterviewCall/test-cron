const cron = require('node-cron');
const { startOfToday, endOfToday } = require('date-fns');
const { toZonedTime } = require('date-fns-tz');

const { ScheduleRepository } = require('../repositories');
const { ScheduleService } = require('../services');

const scheduleService = new ScheduleService(new ScheduleRepository());

const job = cron.schedule('* * * * *', async () => {
    try {
        const now = new Date();
        const zonedTime = toZonedTime(now, 'Asia/Kolkata');
        const todayStart = startOfToday(zonedTime);
        const todayEnd = endOfToday(zonedTime);

        await scheduleService.updateTestStatus(todayStart, todayEnd, now);
    } catch (error) {
        console.log(error);
    }
});

module.exports = job;