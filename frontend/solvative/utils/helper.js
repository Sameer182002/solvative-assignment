


export function getConvertDate(timestamp){

    const date = new Date(timestamp);

    // Format the date and time
    const readableDate = date.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false // Set to true if you want 12-hour format with AM/PM
    });

    return readableDate
}