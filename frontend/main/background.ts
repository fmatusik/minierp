import path from 'path'
import { app, ipcMain, dialog, BrowserWindow } from 'electron'
import serve from 'electron-serve'
import { createWindow } from './helpers'

const isProd = process.env.NODE_ENV === 'production'

if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}

;(async () => {
  await app.whenReady()

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  if (isProd) {
    await mainWindow.loadURL('app://./home')
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}/home`)
    mainWindow.webContents.openDevTools()
  }
})()

app.on('window-all-closed', () => {
  app.quit()
})

ipcMain.on('message', async (event, arg) => {
  event.reply('message', `${arg} World!`)
})

ipcMain.handle("show-confirm", async (event, message: string) => {
  const result = await dialog.showMessageBox(BrowserWindow.getFocusedWindow()!, {
    type: "question",
    buttons: ["Tak", "Nie"],
    defaultId: 0,
    cancelId: 1,
    title: "Potwierdzenie",
    message,
  });

  return result.response === 0;
});

ipcMain.handle("show-alert", async (event, message: string) => {
  await dialog.showMessageBox(BrowserWindow.getFocusedWindow()!, {
    type: "info",
    buttons: ["OK"],
    defaultId: 0,
    title: "Informacja",
    message,
  });

  return true;
});
