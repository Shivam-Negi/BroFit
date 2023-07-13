const cron = require('node-cron');
const { checkInTime } = require('../helpers/datetime-helpers');
const { AttendanceService } = require('../../services');
const { GymRepository } = require('../../repositories');
const gymRepository = new GymRepository();

const status = 'IN';

/* get currentlyCheckedIn mems every 10 mins and update the 
corresponding hour of the live graph of each gym */
async function graphCron() {
  cron.schedule('*/15 * * * * *', async () => {
    try {
      const currentTime = checkInTime();
      const hour = currentTime.split(':')[0];
      const gyms = await gymRepository.getAll();
      for (const gym of gyms) {
        let liveMem = gym.currentlyCheckedIn;
        // console.log(`liveMem of gymId ${gym.gymId} is ${liveMem}`);
        await gymRepository.updateByGymId(gym.gymId, {
          $set: {
            [`liveGraph.${hour}`]: liveMem,
          }
        })
      }
    } catch (error) {
      console.log('graphCron error : ', error);
    }
  })
}



async function scheduleCrons() {
    // every 10 mins it will check
    cron.schedule('*/15 * * * * *', async () => {
      try {
        const members = await AttendanceService.getStatusInUsers(status);
        console.log('members inside cron:', members);
        
        const countMembersByGymId = (members) => {
          const countMap = {};
        
          for (const member of members) {
            const { gymId } = member;
            
            if (!countMap[gymId]) {
              countMap[gymId] = 1;
            } else {
              countMap[gymId] += 1;
            }
          }
        
          const checkInMems = [];
        
          for (const gymId in countMap) {
            checkInMems.push({ [gymId]: countMap[gymId] });
          }
        
          return checkInMems;
        };
        
        const checkInMems = countMembersByGymId(members);
        console.log('checkInMems:', checkInMems);
        
        // Update the gym with the checkInMems
        for (const checkedIn of checkInMems) {
            const id = Object.keys(checkedIn)[0]; // Extract the id from the object key
            const data = checkedIn[id]; // Extract the data from the object value
            
            /* const gym = await gymRepository.findGym(+id);
            console.log('gym : ', gym); */
            const currentTime = checkInTime();
            const hour = currentTime.split(':')[0];
            const response = await gymRepository.updateByGymId(+id, {
                currentlyCheckedIn : data,
                $set: {
                  [`liveGraph.${hour}`]: data,
                }
            });
            console.log('response : ', response);
        }

      } catch (error) {
        console.error('cron error:', error);
      }
    });
  }
  

module.exports = graphCron;