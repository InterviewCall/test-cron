const cron = require('node-cron');
const { startOfToday, endOfToday } = require('date-fns');
const { toZonedTime, fromZonedTime } = require('date-fns-tz');

const { ScheduleRepository } = require('../repositories');
const { ScheduleService } = require('../services');

const scheduleService = new ScheduleService(new ScheduleRepository());

const job = cron.schedule('* * * * *', async () => {
    try {
        const now = new Date();
        const zonedTime = toZonedTime(now, 'Asia/Kolkata');
        const todayStart = startOfToday(zonedTime);
        const todayEnd = endOfToday(zonedTime);

        const todayStartUtc = fromZonedTime(todayStart, 'Asia/Kolkata');  // Corrected function
        const todayEndUtc = fromZonedTime(todayEnd, 'Asia/Kolkata');

        console.log('start', todayStart);
        console.log('end', todayEnd);
        console.log('now', zonedTime);

        await scheduleService.updateTestStatus(todayStartUtc, todayEndUtc, zonedTime);
    } catch (error) {
        console.log(error);
    }
});

module.exports = job;