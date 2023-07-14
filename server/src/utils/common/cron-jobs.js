const cron = require('node-cron');
const { checkInTime, HrsToMins } = require('../helpers/datetime-helpers');
const { AttendanceService } = require('../../services');
const { GymRepository, AttendanceRepository } = require('../../repositories');
const gymRepository = new GymRepository();
const attendanceRepository = new AttendanceRepository();

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


 /* get statusIn users and check if their checkIn time has been for more than 2.5 hrs.
 If yes update their checkOut time and change their status to 'OUT' */
async function checkOutCron() {
    // every 15 mins it will check
    cron.schedule('*/15 * * * * *', async () => {
      try {
        const members = await AttendanceService.getStatusInUsers(status);
        //  console.log('members inside cron:', members);

        const currentTime = HrsToMins(checkInTime());
        // console.log('time : ', currentTime);
        for(const member of members) {
          const attendanceId = member._id;
          const data = {
            checkOut : checkInTime(),
            status : 'OUT'
          }
          let memInHr = member.checkIn.split(':')[0];
          if(memInHr > (+checkInTime().split(':')[0])) {
            await attendanceRepository.update(attendanceId, data);
            await gymRepository.updateByGymId(member.gymId, {
              $inc: {
                currentlyCheckedIn: -1
              }
            });
          }
          else {
            let memTime = HrsToMins(member.checkIn);
            // console.log('mem : ', memTime);
            const diff = currentTime - memTime;
            // console.log('diff :', diff);
            if(diff > 180) {
              await attendanceRepository.update(attendanceId, data);
              await gymRepository.updateByGymId(member.gymId, {
                $inc: {
                  currentlyCheckedIn: -1
                },
              })
            }
          }
        }
      } catch (error) {
        console.error('cron error:', error);
      }
    });
  }
  

module.exports = {
  graphCron,
  checkOutCron
}