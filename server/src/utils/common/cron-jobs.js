const cron = require('node-cron');
const { checkInTime, HrsToMins, currentDate } = require('../helpers/datetime-helpers');
const { AttendanceService } = require('../../services');
const { GymRepository, AttendanceRepository, UserProfileRepository } = require('../../repositories');
const gymRepository = new GymRepository();
const attendanceRepository = new AttendanceRepository();
const userProfileRepository = new UserProfileRepository();

const status = 'IN';

/* get currentlyCheckedIn mems every 5 mins and update the 
corresponding hour of the live graph of each gym */
async function graphCron() {
  cron.schedule('*/5 * * * * ', async () => {
    try {
      const currentTime = checkInTime();
      const hour = currentTime.split(':')[0];
      const gyms = await gymRepository.getAll();
      for (const gym of gyms) {
        // console.log('gym inside cron:', gym);
        let liveMem = gym.currentlyCheckedIn;
        // console.log(`liveMem of gymId ${gym.gymId} is ${liveMem}`);
        await gymRepository.updateByGymId(gym.gymId, {
          $set: {
            [`liveGraph.${hour}`]: liveMem,
          }
        });
      }
    } catch (error) {
      console.log('graphCron error : ', error);
    }
  })
}


 /* get statusIn users and check if their checkIn time has been for more than 3 hrs.
 If yes update their checkOut time and change their status to 'OUT' */
async function checkOutCron() {
    // every 15 mins it will check
    cron.schedule('*/15 * * * * ', async () => {
      try {
        const members = await AttendanceService.getStatusInUsers(status);
          // console.log('members inside cron:', members);
        const currentTime = HrsToMins(checkInTime());
        // console.log('time : ', currentTime);
        for(const member of members) {
          const attendanceId = member._id;
          const data = {
            checkOut : checkInTime(),
            status : 'OUT'
          }
          let memInHr = member.checkIn.split(':')[0];
          // if user hasn't checked out till 1 a.m., auto checkout 
          if(memInHr > (+checkInTime().split(':')[0]) && (+checkInTime().split(':')[0]) > 0) {
            await attendanceRepository.update(attendanceId, data);
            await gymRepository.updateByGymId(member.gymId, {
              $inc: {
                currentlyCheckedIn: -1
              }
            });
          }
          // for rest of the cases
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
        console.error('checkOutCron error:', error);
    }
  });
}

async function planExCron() {
  cron.schedule('0 0 * * *', async () => {
    try {
      const users = await userProfileRepository.getExpireToday(currentDate());
      //  console.log('users : ', users);
      const data = {
        status: 'inactive',       
        planExpiryDate: '',
        planStartDate: '',
      }
      for(const user of users) {
        await userProfileRepository.updateUserProfile(user._id, data);
        console.log(`${user} plan updated to inactive at ${checkInTime()}`);
      }
    } catch (error) {
      console.log('planExCron error : ', error);
    }
  })
}

// every night at 2 a.m. 
async function graphResetCron() {
  cron.schedule('0 0 * * *', async () => {
    console.log('resetting graph');
    try {
      const gyms = await gymRepository.getAll();
      for (const gym of gyms) {
        for(let i = 0; i < 24; ++i) {
           await gymRepository.updateByGymId(gym.gymId, {
            $set: {
              [`liveGraph.${i}`]: 0,
            }
          });
           console.log(`${gym} graph reset at ${checkInTime()}`);
        }
      }
    } catch (error) {
      console.log('graphResetCron error : ', error);
    }
  })
}


module.exports = {
  graphCron,
  checkOutCron,
  planExCron,
  graphResetCron,
}