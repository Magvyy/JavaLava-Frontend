



// dd-MM-yyyy HH:mm:ss format
export function timeSinceMessage(sent: string) {
    const [day, month, year] = sent.split(" ")[0].split("-").map(Number);
    const [hour, min, sec] = sent.split(" ")[1].split(":").map(Number);
    const now = new Date();
    const date = new Date(year, month - 1, day, hour, min, sec);
    
    const minutes = Math.floor((now.getTime() - date.getTime()) / 60000);
    if (minutes >= 60) {
        const hours = Math.floor(minutes / 60);
        if (hours >= 24) {
            const days = Math.floor(hours / 24);
            return (days > 1) ? days + " days ago" : days + " day ago"; 
        }
        return (hours > 1) ? hours + " hours ago" : hours + " hour ago";
    }
    return minutes + " min ago";
}