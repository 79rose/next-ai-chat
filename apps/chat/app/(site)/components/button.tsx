import { App, Divider, message, Modal, Typography } from 'antd';
import { useTheme, useThemeMode } from 'antd-style';
import { FC, ReactNode } from 'react';

const StaticModal = Modal._InternalPanelDoNotUseOrYouWillBeFired;
const StaticMessage = message._InternalPanelDoNotUseOrYouWillBeFired;
const { Text } = Typography;

interface AppProps {
  extra?: ReactNode;
}
const Demo: FC<AppProps> = ({ extra }) => {
  const theme = useTheme();
  const { appearance, themeMode, browserPrefers } = useThemeMode();
  return (
    <App>
      <Text type={'secondary'}>主题模式：</Text>
      {themeMode}
      <Divider type={'vertical'} />
      <Text type={'secondary'}>外观模式：</Text>
      {appearance}
      <Divider type={'vertical'} />
      <Text type={'secondary'}>浏览器外观：</Text>
      {browserPrefers}

      <StaticModal type={'success'} title={'成功'}>
        静态成功提示
      </StaticModal>
      <StaticMessage type={'error'} content={'失败提示'}></StaticMessage>
      {extra}
    </App>
  );
};
export default Demo;
