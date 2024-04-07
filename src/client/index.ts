// // 假设你已经在页面上添加了一个id为"dev-tools-icon"的元素
// const devToolsIcon = document.getElementById('dev-tools-icon')!

// // 设置WebSocket连接
// const ws = new WebSocket('ws://localhost:8080')

// ws.onopen = () => {
//   console.log('WebSocket connected')
// }

// ws.onmessage = (event) => {
//   // 处理从服务器收到的消息
//   console.log('Received:', event.data)
// }

// // 点击小图标时发送消息到服务器
// devToolsIcon.addEventListener('click', () => {
//   ws.send('open-dev-tools')
// })

// // 发送新增文件的请求
// function addNewFile(filePath: any) {
//   ws.send(JSON.stringify({ action: 'add-file', path: filePath }))
// }

// // 发送执行命令的请求
// function executeCommand(command: any) {
//   ws.send(JSON.stringify({ action: 'exec-cmd', cmd: command }))
// }

export { IoC } from './IoC'
export { EDGE_POSITION, IDENTIFIERS } from './components/base/constants'
