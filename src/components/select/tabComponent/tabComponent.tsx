import {FC, useEffect, useImperativeHandle, useMemo, useState} from "react";
import React from "react";
import "./index.scss"

interface TabProps {
    onChangeTab: (item: any) => Promise<void> | void;
}

const tabList = ["热门省市","ABCD","EFGH","JKLM","NOPQ","RSTW","XYZ"]
const TabComponent:FC<TabProps> = ({onChangeTab})=>{
    const [activeKey, setActiveKey] = useState(tabList[0])


    useEffect(()=>{

    },[])

    const changTab = (item)=>{
        onChangeTab(item);
        setActiveKey(item);
    }

    return <div className={'sidebar'}>
        {tabList.map((item,index)=>{
            return <div className={['tab-button',activeKey === item?"tab-active":""].join(" ")} onClick={()=>changTab(item)} key={index}>{item}</div>
        })}
    </div>
}

export default TabComponent;