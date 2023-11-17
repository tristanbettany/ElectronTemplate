# Electron Template

This template is designed to be a quick start to building an application that as default runs
with a hidden window and a tray icon and context menu which you can open additional windows from
like a settings window.

## Usage

To use simply clone the repo and do the following

```
npm install
npm run build
npm run start
```

This will install dependancies, then build the PostCSS, then start the application. You can find
the tray icon in your system tray and right clicking will give you the context menu to open the 
settings.

## Packaging

If you want to package to an installer for distribution simply do the following

```
npm run package
```

The packaging tool used is squirrel js, so for further information in controling that look at their docs.