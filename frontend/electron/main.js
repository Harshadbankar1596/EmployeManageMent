import dotenv from "dotenv";
dotenv.config();
import path from 'node:path';
import { app, BrowserWindow } from 'electron';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const win = new BrowserWindow({
    titleBarStyle: 'hidden',
    ...(process.platform !== 'darwin' ? { titleBarOverlay: true } : {}),
    width: 800,
    height: 600,
    icon: path.join(__dirname, '../public/images.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Load preload script
    },
  });

  // if (import.meta.env.NODE_ENV === 'production') {
  //   win.loadFile(path.join(__dirname, '../dist/index.html'));
  // } else {
  //   win.loadURL('http://localhost:5173');
  // }
  // win.loadFile(path.join(__dirname, '../dist/index.html'));
  win.loadURL('http://localhost:5173');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
