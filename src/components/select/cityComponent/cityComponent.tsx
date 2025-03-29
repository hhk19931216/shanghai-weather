import {FC, memo, useEffect, useState} from "react";
import {Button, ConfigProvider} from "antd";
import "./index.scss"


interface PropsType {
    provinces: any[];
    location: any[];
    propsActive: string | null;
    handleChange: (value: any, id?: any) => Promise<void>;
}
const CityComponent:FC<PropsType> = memo(({provinces, location, handleChange,propsActive}) => {
    const [active,setActive] = useState(propsActive)
    useEffect(() => {

    }, []);

    const changeTab = (item, id?) => {
        // console.log(item);
        setActive(item)
        if (handleChange) {
            handleChange(item, id)
        }
    }

    const BottonToken = (item,index,id?)=>{
        return  <ConfigProvider
            theme={{
                components: {
                    Button: {
                        colorPrimary: '#ffffff',  // 主按钮背景色
                        colorPrimaryHover: '#e8f3ff', // 悬停状态
                        colorPrimaryActive: '#4e6ef2', // 点击状态
                        colorText: '#ffffff', // 按钮文字颜色
                        borderRadius: 8, // 圆角大小
                        controlHeight: 40, // 按钮高度
                    },
                },
            }}
        >
            <Button type="primary" className={['city-selector-btn',active === item ? 'active':""].join(" ")} onClick={() => changeTab(item,id)} key={index}>{item}</Button>
        </ConfigProvider>
    }


    return <div className={'content'}>
        <div className={'city-selector-content-label'}>省/市</div>
        <div className={'city-selector-content-province'}>
            {Array.isArray(provinces) ? provinces.map((item, index) =>
                <div className={'city-selector-content-city'} key={index}>
                    {BottonToken(item,index)}
                </div>) : <div>这里什么也没有</div>}
        </div>
        <div className={'city-selector-content-label'}>市/区</div>
        <div className={'city-selector-content-province'}>
            {Array.isArray(location) ? location.map((item) =>
                <div className={'city-selector-content-city'} key={item.id}>
                    {BottonToken(item.name,item.id,item.id)}
                </div>) : null}
        </div>
    </div>

})

export default CityComponent;
