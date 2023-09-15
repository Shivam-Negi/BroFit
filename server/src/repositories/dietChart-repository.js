const CrudRepository = require('./crud-repository');
const DietChart = require('../models/dietChart');


class DietChartRepository extends CrudRepository {
    constructor() {
        super(DietChart);
    }

    async getDietChartsByGymId(gymId) {
        try {
            const dietCharts = await DietChart.find({
                gymId : gymId
            });
            return dietCharts;
        } catch (error) {
            throw error;
        }
    }
    async getDietChartByUserId(id) {
        try {
            const dietCharts = await DietChart.findOne({
                userId : id,
            });
            return dietCharts;
        } catch (error) {
            throw error;    
        }
    }
}

module.exports = DietChartRepository;