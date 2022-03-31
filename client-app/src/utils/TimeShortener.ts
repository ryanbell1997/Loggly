//Removes milliseconds
export default function timeShortener(time: string) {
    return time.slice(0,-3);
}