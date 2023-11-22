const { app, BrowserWindow, screen } = require('electron')

function createWindow() {
  // 获取主屏幕的大小
  const mainScreen = screen.getPrimaryDisplay()
  const { width, height } = mainScreen.workAreaSize

  // 创建一个浏览器窗口，大小设置为屏幕大小
  const win = new BrowserWindow({
    width: width,
    height: height,
    webPreferences: {
      nodeIntegration: true
    },
    autoHideMenuBar: true // 隐藏菜单栏
  })

  // 加载应用的 HTML 文件
  win.loadFile('index.html')
}

// 当 Electron 完成初始化并准备创建窗口时调用 createWindow 函数
app.whenReady().then(createWindow)

// 在所有窗口都关闭时退出应用
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// 创建新窗口（在 macOS 上为应用添加 Dock 菜单）
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
