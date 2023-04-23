import React from 'react'

/** 
 * MessageChannel 基本用法
 * port1和port2统一叫做MessagePort
 * MessagePort上有几个方法： start/postMessage/close/onmessageerror
 */
// const { port1, port2 } = new MessageChannel();
// port1.addEventListener('message', function (event) {
//   console.log('收到来自port2的消息：', event.data); // 收到来自port2的消息： pong
// });
// port1.start();
// port2.addEventListener('message', function (event) {
//   console.log('收到来自port1的消息：', event.data); // 收到来自port1的消息： ping
//   port2.postMessage('pong');
// });
// port2.start();
// port1.postMessage('ping');


function a(port) {
  port.postMessage({from: 'a', message: 'I am message from a~'})
}

function b(port) {
  port.onmessage = (e) => {
    console.log('receive data at b:', e.data)
  }
}

export default function MessageChannelDemo () {
  const {port1, port2} = new MessageChannel()
  a(port1)
  b(port2)
  return 'MessageChannelDemo 查看控制台'
}