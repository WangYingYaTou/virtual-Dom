// 创建DOM元素的类 构建实例对象 类型属性子元素
class Element {
  constructor(type, props, children){
    this.type = type        //标签  ul  div等
    this.props = props      // 属性  class  id  style等
    this.children = children   // 子组件
  }
}


// 创建虚拟DOM 返回虚拟节点object
function createElement(type, props, children)  {
  return new Element(type, props, children)
}


// 转化为真是DOM  render
function render(domObj) {
  // 根据type创建元素
  let element = document.createElement(domObj.type)

  // 根据props遍历属性
  for (let propsName in domObj.props) {
    let propsValue = domObj.props[propsName]
    element.setAttribute(propsName,propsValue)
  }

  // 遍历子节点
  // 如果是虚拟DOM，就继续递归渲染
  // 不是就代表是文本节点，直接创建
  domObj.children.forEach(child => {
    child = child instanceof Element ? render(child) : document.createTextNode(child)
    element.appendChild(child)
  })

  return element
}


// 属性
function setAttr(node, propsName, propsValue) {
  switch(propsName) {
    case 'value':
       // node是一个input或者textarea就直接设置其value即可
       if (node.tagName.toLowerCase() === 'input' ||
            node.tagName.toLowerCase() === 'textarea') {
            node.propsValue = propsValue;
        } else {
            node.setAttribute(propsName, propsValue);
        }
       break;
       case 'style':
          // 直接赋值行内样式
          node.style.cssText = propsValue;
          break;
      default:
          node.setAttribute(propsName, propsValue);
          break;
  }
}



// 将元素插入到页面内
function renderDom(el, target) {
  target.appendChild(el);
}

export {
  Element,
  createElement,
  render,
  setAttr,
  renderDom
};
