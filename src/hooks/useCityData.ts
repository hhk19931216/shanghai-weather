import {useCallback} from "react";
import globalDataServer from "@/service/GlobalData.server";

export function useCityData() {
    const fetchHotCities = useCallback(async () => {
        const res = await globalDataServer.getHotCitys() as { topCityList: any[] };
        return res.topCityList?.map(item => item.name) || [];
    }, []);

    const searchCities = useCallback(async (value: string) => {
        const res = await globalDataServer.getCitys(value) as { location: any[] };
        return res.location || [];
    }, []);

    return {fetchHotCities, searchCities};
}