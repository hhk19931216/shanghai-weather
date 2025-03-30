import {FC, useCallback, useEffect, useImperativeHandle, useMemo, useState} from "react";
import React from "react";
import "./index.scss"

interface TabProps {
    onChangeTab: (item: string) => Promise<void> | void;
}

const TAB_LIST = ["热门省市", "ABCD", "EFGH", "JKLM", "NOPQ", "RSTW", "XYZ"]  as const;
const TabComponent: FC<TabProps> = ({onChangeTab}) => {
    const [activeKey, setActiveKey] = useState<typeof TAB_LIST[number]>(TAB_LIST[0])

    const handleTabChange = useCallback((item) => {
        onChangeTab(item);
        setActiveKey(item);
    }, [onChangeTab])

    return <div className={'sidebar'}>
        {TAB_LIST.map((item) => {
            return <div className={['tab-button', activeKey === item ? "tab-active" : ""].join(" ")}
                        onClick={() => handleTabChange(item)} key={item}>{item}</div>
        })}
    </div>
}

export default TabComponent;