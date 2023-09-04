const moment = require('moment-timezone');

function convertTutorTimeToStudentTime(tutorsDateTime, tutorsTimezoneValue, studentsTimezoneValue, tutorsTimezoneOffset, studentsTimezoneOffset) {
    const tutorsTimezone = moment.tz.zone(tutorsTimezoneValue);
    const studentsTimezone = moment.tz.zone(studentsTimezoneValue);

    if (tutorsTimezone && studentsTimezone) {
        const tutorsTime = moment(tutorsDateTime).tz(tutorsTimezoneValue).format('HH:mm');
        console.log(tutorsTime);
        const studentsTime = moment(tutorsTime, 'HH:mm').tz(studentsTimezoneValue).format('HH:mm');
        return studentsTime;
    }

    // Fallback to using timezone offset if the timezoneName is not present
    const offsetDiff = studentsTimezoneOffset - tutorsTimezoneOffset;
    const studentsDateTime = moment(tutorsDateTime).add(offsetDiff, 'minutes').format('HH:mm');
    return studentsDateTime;
}

// Sample usage with timezone names
const tutorsDateTimeByName = moment().set({ hour: 3, minute: 0 }).toDate();

const tutorsTimezoneName = "America/Detroit";
const tutorsTimezoneOffset = -240; 

const studentsTimezoneName = "America/Los_Angeles";
const studentsTimezoneOffset = -420; 

const studentsTimeFromNames = convertTutorTimeToStudentTime(tutorsDateTimeByName, tutorsTimezoneName, studentsTimezoneName, tutorsTimezoneOffset, studentsTimezoneOffset);
console.log(studentsTimeFromNames); // should return time in HH:MM format
