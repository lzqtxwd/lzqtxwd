import anchorDirectory_zh from './anchorDirectory/zh_CN.json';

import anchorDirectory_en from './anchorDirectory/en-US.json';

const zh_CN = {
  ...anchorDirectory_zh,
};

const en_US = {
  ...anchorDirectory_en,
};

const locales = {
  'zh-CN': zh_CN,
  'en-US': en_US,
};

export default locales;
