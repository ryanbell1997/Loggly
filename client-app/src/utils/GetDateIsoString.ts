export default function getDateIsoString(dateString: string){
    if(/([0-9]{4})-([0-9]{2})/.test(dateString)){
        return new Date(parseInt(dateString.slice(0, 4)), parseInt(dateString.slice(6,8)), 0, 0,0,0,0).toISOString();
    }
}