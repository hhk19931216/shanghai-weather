import {FC, memo, useEffect, useState, useCallback, useMemo} from "react";
import {Button, ConfigProvider, Empty, Spin} from "antd";
import "./index.scss";

interface ProvinceItem {
    id?: string | number;
    name: string;
}

interface LocationItem {
    id: string | number;
    name: string;
}

interface PropsType {
    provinces: ProvinceItem[] | string[];
    location: LocationItem[];
    propsActive: string | null;
    handleChange: (value: string, id?: string | number) => Promise<void>;
    loading?: boolean;
}

const CityComponent: FC<PropsType> = memo(({provinces, location, handleChange, propsActive, loading = false}) => {
    const [active, setActive] = useState(propsActive);
    const [internalLoading, setInternalLoading] = useState(false);

    useEffect(() => {
        setActive(propsActive);
    }, [propsActive]);


    const changeTab = useCallback(async (item: string, id?: string | number) => {
        setActive(item);
        if (handleChange) {
            try {
                setInternalLoading(true);
                await handleChange(item, id);
            } finally {
                setInternalLoading(false);
            }
        }
    }, [handleChange]);

    const buttonThemeConfig = useMemo(() => ({
        components: {
            Button: {
                colorPrimary: '#ffffff',
                colorPrimaryHover: '#e8fff3',
                colorPrimaryActive: '#4e6ef2',
                colorText: '#ffffff',
                borderRadius: 8,
                controlHeight: 40,
            },
        },
    }), []);

    const ButtonToken = useCallback((item: string, id?: string | number, index?: number) => (
        <ConfigProvider theme={buttonThemeConfig}>
            <Button
                type="primary"
                className={['city-selector-btn', active === item ? 'active' : ''].join(' ')}
                onClick={() => changeTab(item, id)}
                key={id || index}
            >
                {item}
            </Button>
        </ConfigProvider>
    ), [active, buttonThemeConfig, changeTab, internalLoading]);

    const renderProvinces = useMemo(() => {
        if (!Array.isArray(provinces)) return <Empty description="暂无省份数据"/>;

        return provinces.map((item, index) => {
            const name = typeof item === 'string' ? item : item.name;
            const id = typeof item === 'string' ? undefined : item.id;

            return (
                <div className="city-selector-content-city" key={id || index}>
                    {ButtonToken(name, id, index)}
                </div>
            );
        });
    }, [provinces, ButtonToken]);

    const renderLocations = useMemo(() => {
        if (!Array.isArray(location)) return null;
        if (location.length === 0) return <Empty description="请先选择省份"/>;

        return location.map((item) => (
            <div className="city-selector-content-city" key={item.id}>
                {ButtonToken(item.name, item.id)}
            </div>
        ));
    }, [location, ButtonToken]);

    return (
        <div className="content">
            <Spin spinning={loading || internalLoading}>
                <div className="city-selector-content-label">省/市</div>
                <div className="city-selector-content-province">
                    {renderProvinces}
                </div>

                <div className="city-selector-content-label">市/区</div>
                <div className="city-selector-content-province">
                    {renderLocations}
                </div>
            </Spin>
        </div>
    );
});

export default CityComponent;