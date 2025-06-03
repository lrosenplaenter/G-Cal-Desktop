/*
 * G-Cal Desktop
 * Copyright (c) 2025 Leon Rosenplänter
 * Licensed under the MIT License. See LICENSE file in the project root for full license information.
 */

// Load modules
const { app, BrowserWindow } = require('electron');
const path = require('path');

// Define window
let window;
const createWindow = () => {
    window = new BrowserWindow({
        icon: path.join(__dirname, 'assets', 'calendar-heart.png'),
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,
        },
        title: 'G-Cal Desktop 1.0.0',
    }),
    window.setMenu(null)
    window.loadURL('https://calendar.google.com/')

    // Catch load errors and show offline page
    window.webContents.on('did-fail-load', () => {
        window.loadFile(path.join(__dirname, 'offline.html'))
    })

    // Prevent the website from changing the window title
    window.webContents.on('page-title-updated', (event) => {
        event.preventDefault();
        window.setTitle('G-Cal Desktop 1.0.0');
    });
}

// Start render process
app.whenReady().then(() => {
    createWindow()
})

// Quit app when all windows are closed
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})