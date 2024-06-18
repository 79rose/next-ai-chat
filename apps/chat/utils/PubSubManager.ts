interface EventFace {
  // 定义类
  on: (TypeName: string, callback: Function) => void; //订阅消息
  emit: (TypeNam: string, ...args: Array<any>) => void; // 发布消息
  off: (TypeName: string, callback: Function) => void; //删除指定函数
  once(TypeName: string, callback: Function): void; // 只执行一次，删除指定函数
  //on(Ms:string,Fun:Function):void 接口定义函数
}

interface List {
  //定义一个属性例如：post，值为【】，将on的都push进去
  [key: string]: Array<Function>;
}

class Dispatch implements EventFace {
  list: List;
  constructor() {
    // 初始化一个对象
    this.list = {};
  } // 将其信息收集起来
  on(TypeName: string, callback: Function) {
    const fn = this.list[TypeName] || [];
    fn.push(callback);
    this.list[TypeName] = fn;
    console.log('this.list', this.list);
    console.log('fn', fn);
  } // 发布消息，也就是执行on的方法

  emit(TypeName: string, ...args: Array<any>) {
    // 判断是不是有emit的post这个对应的方法去执行
    const eventName = this.list[TypeName];
    console.log('eventName', eventName);
    if (eventName) {
      eventName.forEach((fn) => {
        fn.apply(this, args);
      });
    } else {
      console.log(`名称错误${TypeName}`);
    }
  } // 将其方法fn卸载掉

  off(TypeName: string, callback: Function) {
    const eventName = this.list[TypeName];
    if (eventName && callback) {
      //判断有没有这个对象属性和函数
      let index = eventName.findIndex((fns) => fns === callback);
      eventName.splice(index, 1);
    } else {
      console.log(`名称错误${TypeName}`);
    }
  } // 只执行一次

  once(TypeName: string, callback: Function): void {
    // 定义一个临时变量，和on一样，只是它添加的只能使用一次
    let decor = (...args: Array<any>) => {
      console.log('args', args);
      callback.apply(this, args); // 执行然后删除
      this.off(TypeName, decor); // 删除方法
    }; // 使用on添加到，list中
    this.on(TypeName, decor);
  }
}

const o = new Dispatch();

export default o;
