import { createElement,  render, renderDom } from './element';
// +++ 引入diff和patch方法
import diff from './diff';
import patch from './patch';
// +++



var virtualDom = createElement('ul', {id: 'list'}, [
  createElement('li', {class: 'item'}, ['Item 1']),
  createElement('li', {class: 'item'}, ['Item 2']),
  createElement('li', {class: 'item'}, ['Item 3'])
])
console.log(virtualDom)



// 真实DOM
let el = render(virtualDom)
console.log(el)


// 直接将DOM添加到页面内
renderDom(el, document.getElementById('root')); 


// 创建另一个新的虚拟DOM
let virtualDom2 = createElement('ul', {class: 'list-group'}, [
  createElement('li', {class: 'item active'}, ['七里香']),
  createElement('li', {class: 'item'}, ['一千年以后']),
  createElement('li', {class: 'item'}, ['需要人陪'])    
]);

// diff一下两个不同的虚拟DOM
let patches = diff(virtualDom, virtualDom2);
console.log(patches)


// 将变化打补丁，更新到el
patch(el, patches);


