import { Flex, FloatButton } from 'antd';
import Card from './Card';
import Icon from './Icon';
import SwitchOrigin from './switchOrigin';
export default function MainChat({ className }: { className?: string }) {
  return (
    <Flex className={`${className} w-full`} vertical>
      <div className="mb-8 mt-8 flex items-center justify-center">
        <SwitchOrigin />
      </div>
      <Icon />
      <div className="mt-8 flex flex-row flex-wrap justify-center gap-4 p-4  sm:pt-8 md:gap-8">
        <Card />
        <Card />
        <Card className="hidden md:block" />
        <Card className="hidden md:block" />
      </div>
      <FloatButton.Group shape="circle" style={{ right: 54, bottom: 87 }}>
        <FloatButton.BackTop visibilityHeight={20} duration={2000} />
      </FloatButton.Group>
    </Flex>
  );
}
