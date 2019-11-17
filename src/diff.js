function diff(oldTree, newTree) {
  let index = 0  // 当前节点的标志
  let patches = {} //记录节点差异对象 
  // 递归树 比较后的结果放到补丁里
  dfsWalk(oldTree, newTree, index, patches);

  return patches;
}


function dfsWalk(oldNode, newNode, index, patches) {
  // 每一个元素都有一个补丁
  let current = []
  //type: 'REMOVE'  没有新节点
  //type: 'TEXT'    文本的变化
  //type: 'ATTR'    属性的变化  class id style
  //type: 'REPLACE' 节点被替换
  if(!newNode) {
    current.push({ type: 'REMOVE', index });
  }else if(isString(newNode) && isString(oldNode)){
    // 判断文本是否一致
    if(newNode !== oldNode) {
      current.push({ type: 'TEXT', text: newNode});
    }
  }else if(newNode.type === oldNode.type) {
    // 比较属性修改
    let attr = diffAttr(oldNode.props, newNode.props)
    if(Object.keys(attr).length > 0) {
      current.push({ type: 'ATTR', attr });
    }

    // 如果遍历有子节点 遍历子节点
    // 如果有子节点，遍历子节点
    diffChildren(oldNode.children, newNode.children, patches);

  }else {
    current.push({ type: 'REPLACE', newNode});
  }

  // 当前元素确实有补丁存在
  if (current.length) {
    // 将元素和补丁对应起来，放到大补丁包中
    patches[index] = current;
  }
}


// 比较属性
function diffAttr(oldAttrs, newAttrs) {
  let patch = {};
  // 老节点更换新节点属性
  for (let key in oldAttrs) {
      if (oldAttrs[key] !== newAttrs[key]) {
          patch[key] = newAttrs[key]; // 有可能还是undefined
      }
  }

  // 老节点增加新节点新增属性
  for (let key in newAttrs) {
      // 老节点没有新节点的属性
      if (!oldAttrs.hasOwnProperty(key)) {
          patch[key] = newAttrs[key];
      }
  }
  return patch;
}

// 索引
let num = 0
function diffChildren(oldChildren, newChildren, patches) {
  // 比较老的第一个和新的第一个
  oldChildren.forEach((child, index) => {
    dfsWalk(child, newChildren[index], ++num, patches);
  });
}

// 是否是字符串
function isString(obj) {
  return typeof obj === 'string';
}


export default diff;

