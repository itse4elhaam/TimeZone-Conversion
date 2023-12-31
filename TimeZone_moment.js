const moment = require('moment-timezone');

function convertTutorTimeToStudentTime(tutorsDateTime, tutorsTimezoneValue, studentsTimezoneValue, tutorsTimezoneOffset, studentsTimezoneOffset) {
    const tutorsTimezone = moment.tz.zone(tutorsTimezoneValue);
    const studentsTimezone = moment.tz.zone(studentsTimezoneValue);

    if (tutorsTimezone && studentsTimezone) {
        const studentsTime = moment(tutorsDateTime, 'HH:mm').tz(studentsTimezoneValue).format('HH:mm');
        return studentsTime;
    }

    // Fallback to using timezone offset if the timezoneName is not present
    const offsetDiff = studentsTimezoneOffset - tutorsTimezoneOffset;
    const studentsDateTime = moment(tutorsDateTime).add(offsetDiff, 'minutes').format('HH:mm');
    return studentsDateTime;
}


const tutorsTimezoneName = "America/Detroit";
const tutorsTimezoneOffset = -240; 

const studentsTimezoneName = "America/Los_Angeles";
const studentsTimezoneOffset = -420; 

const tutorsDateTimeByName = moment().tz(tutorsTimezoneName).set({ hour: 3, minute: 0 }).toDate();

const studentsTimeFromNames = convertTutorTimeToStudentTime(tutorsDateTimeByName, tutorsTimezoneName, studentsTimezoneName, tutorsTimezoneOffset, studentsTimezoneOffset);
console.log(studentsTimeFromNames);


// DONE(BOTH WAYS):
// LA =>  Detroit  
// LA => Denver
// LA => New_York
// LA => Chicago


// ALL TIMES ZONES 

// America / Chicago
// America / Detriot
// America / New_York
// America / Los_Angeles
// America / Denver
