import {message} from "antd";

interface mesConfig {
  type: string;
  content: string;
  duration: number;
}

let originConfig = {
  type: "loading",
  content: "加载中...",
  duration: 3,
};

export const loading = (config: mesConfig = originConfig) => {
  return new Promise((resolve, reject) => {
    message.open({
      type: "loading",
      content: config.content,
      duration: config.duration,
    });
    resolve(true);
  });
};

export const checkNetwork = () => {
  return !!navigator?.onLine;
};






