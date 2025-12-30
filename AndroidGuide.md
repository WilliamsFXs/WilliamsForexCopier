# Williams Forex: Android Studio Setup

### 1. Create the Project
1. Open Android Studio -> New Project -> **Empty Views Activity**.
2. Name: `Williams Forex`
3. Package: `com.williamsforex.robot`

### 2. Copy the Files
1. **MainActivity.java**: Copy to `app/src/main/java/com/williamsforex/robot/MainActivity.java`
2. **AndroidManifest.xml**: Copy to `app/src/main/AndroidManifest.xml`
3. **build.gradle**: Copy to `app/build.gradle` (Module: app)

### 3. Move Web Assets
1. Create a folder: `app/src/main/assets/`
2. Copy these files into that folder:
   - `index.html`
   - `index.tsx`
   - `App.tsx`
   - `types.ts`
   - `constants.tsx`
   - `manifest.json`
   - `sw.js`
   - All folders (`components/`, `views/`)

### 4. Build and Run
1. Sync Gradle (Click "Sync Now" in the top bar).
2. Connect an Android device or start an emulator.
3. Press **Run** (Shift + F10).

**Note on ES6/React:** This project uses `importmap` in `index.html`. The `WebViewAssetLoader` in `MainActivity.java` creates a virtual `https://appassets.androidapi.net` domain which is required for the browser to allow these imports without a build step.