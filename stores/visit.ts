export const useVisitStore = defineStore('visit', () => {
    // Main Objects
    const ipDetails = ref<ipDetailsResponse>();

    // Setting Data to the Main Objects
    const setIpDetails = (data?: ipDetailsResponse) => (ipDetails.value = data);

    const fetchClientIP = async () => {
        const { data: ip } = await useFetch('https://api.ipify.org?format=json');
        const response = await fetch(`/get-geoip/${(ip.value as any).ip}`);
        if (response.ok) {
            const ipDetailsResponse = await response.json();
            setIpDetails(ipDetailsResponse);
        } else {
            console.error('Failed to fetch IP details:', response.statusText);
        }
    };

    return { ipDetails, setIpDetails, fetchClientIP };
});
