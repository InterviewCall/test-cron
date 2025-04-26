class ScheduleService {
    constructor(scheduleRepository) {
        this.scheduleRepository = scheduleRepository;
    }

    async updateTestStatus(todayStart, todayEnd, currentTime) {
        try {
            await this.scheduleRepository.updateTestStatus(todayStart, todayEnd, currentTime);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ScheduleService