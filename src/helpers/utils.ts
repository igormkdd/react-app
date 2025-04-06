export function formatTimestamp(timestamp: string) {

    const date = new Date(timestamp);

    // Extract date
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');

    // Extract time
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');

    // Format date and time
    const formattedTime = `${hours}:${minutes}:${seconds}`; // HH:MM:SS
    const formattedDate = `${day}-${month}-${year}`;  // DD-MM-YYYY

    return `${formattedDate} ${formattedTime}`;
}
