class ScheduleService {
    constructor(scheduleRepository) {
        this.scheduleRepository = scheduleRepository;
    }

    async updateTestStatus(currentTime) {
        try {
            await this.scheduleRepository.updateTestStatus(currentTime);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ScheduleService