const cron = require('node-cron');
const { startOfToday, endOfToday } = require('date-fns');
const { toZonedTime, fromZonedTime } = require('date-fns-tz');

const { ScheduleRepository } = require('../repositories');
const { ScheduleService } = require('../services');

const scheduleService = new ScheduleService(new ScheduleRepository());

const job = cron.schedule('* * * * *', async () => {
    try {
        const now = new Date();
        // const zonedTime = toZonedTime(now, 'Asia/Kolkata');
        const todayStart = startOfToday();
        const todayEnd = endOfToday();

        const todayStartUtc = fromZonedTime(todayStart, 'Asia/Kolkata');  // Corrected function
        const todayEndUtc = fromZonedTime(todayEnd, 'Asia/Kolkata');

        console.log('start', todayStart);
        console.log('end', todayEnd);
        console.log('now', now);

        await scheduleService.updateTestStatus(todayStartUtc, todayEndUtc, now);
    } catch (error) {
        console.log(error);
    }
});

module.exports = job;