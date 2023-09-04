const { DateTime } = require('luxon');

// Backend sends the SelectedTimeObject with DateTimeZoneDifference

const fromHour = '13';
const toHour = '15';


const selectedTimeObject = {
    timezone: 'America/Toronto',
    from: {
        DateTimeZoneDifference: `2023-08-16T${fromHour}:00:18.715-04:00`,
    },
    to: {
        DateTimeZoneDifference: `2023-08-16T${toHour}:00:18.715-04:00`,
    }
};

// Frontend extracts values from selectedTimeObject
const fromTime = selectedTimeObject.from.DateTimeZoneDifference;
const toTime = selectedTimeObject.to.DateTimeZoneDifference;

// Convert string times to Luxon DateTime objects using the backend's timezone
const fromDateTimeBackend = DateTime.fromISO(fromTime, { zone: selectedTimeObject.timezone });
const toDateTimeBackend = DateTime.fromISO(toTime, { zone: selectedTimeObject.timezone });

// Get the current user's timezone
const userTimezone = DateTime.local().zoneName;

// Convert the times from the backend's timezone to the user's timezone
const fromDateTimeUser = fromDateTimeBackend.setZone(userTimezone);
const toDateTimeUser = toDateTimeBackend.setZone(userTimezone);

// Output the original times from the backend
console.log(`Original Times from Backend:(TimeZone: ${selectedTimeObject.timezone})`);
console.log("From:", fromTime);
console.log("To:", toTime);

// Output the converted times in the user's timezone
console.log("Converted Times (User's Timezone:", userTimezone);
console.log("From:");
console.log("Date:", fromDateTimeUser.toISODate());
console.log("Day:", fromDateTimeUser.toFormat('cccc'));
console.log("Time:", fromDateTimeUser.toFormat('hh:mm a'));
console.log("Timezone:", userTimezone);

console.log("To:");
console.log("Date:", toDateTimeUser.toISODate());
console.log("Day:", toDateTimeUser.toFormat('cccc'));
console.log("Time:", toDateTimeUser.toFormat('hh:mm a'));
console.log("Timezone:", userTimezone);
