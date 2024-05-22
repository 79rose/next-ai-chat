import { FireFilled ,ThunderboltFilled} from '@ant-design/icons';
import { Segmented } from 'antd';
import { useState } from 'react';
export default function SwitchOrigin() {
  const [value, setValue] = useState<string>('xunfei');
  function onChange(value: any) {
    setValue(value);
  }
  return (
    <div className="shadow-multiple h-16 rounded-md bg-background p-2 ">
      <Segmented
        options={[
          {
            label: (
              <div className="items m-2 flex w-32 justify-center gap-2">
                <FireFilled
                  className={value === 'xunfei' ? 'text-green-600' : ''}
                />
                <div className="text-center text-lg font-semibold">
                  讯飞星火
                </div>
              </div>
            ),
            value: 'xunfei',
          },
          {
            label: (
              <div className="items m-2 flex w-32 justify-center gap-2">
                <ThunderboltFilled
                  className={value !== 'xunfei' ? 'text-green-600' : ''}
                />
                <div className="text-center text-lg font-semibold">
                  暂无更多
                </div>
              </div>
            ),
            value: 'none',
          },
        ]}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
