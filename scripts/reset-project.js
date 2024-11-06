#!/usr/bin/env node

/**
 * This script is used to reset the project to a blank state.
 * It moves the /src directory to /app-example and creates a new /src directory with an index.js and _layout.tsx file.
 * You can remove the `reset-project` script from package.json and safely delete this file after running it.
 */

const fs = require('fs');
const path = require('path');

const root = process.cwd();
const oldDirPath = path.join(root, 'src');
const newDirPath = path.join(root, 'app-example');
const newAppDirPath = path.join(root, 'src');

const indexContent = `import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit src/index.js to edit this screen.</Text>
    </View>
  );
}
`;

const layoutContent = `import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
    </Stack>
  );
}
`;

fs.rename(oldDirPath, newDirPath, (error) => {
  if (error) {
    return console.error(`Error renaming directory: ${error}`);
  }
  console.log('/src moved to /app-example.');

  fs.mkdir(newAppDirPath, { recursive: true }, (error) => {
    if (error) {
      return console.error(`Error creating new src directory: ${error}`);
    }
    console.log('New /src directory created.');

    const indexPath = path.join(newAppDirPath, 'index.js');
    fs.writeFile(indexPath, indexContent, (error) => {
      if (error) {
        return console.error(`Error creating index.js: ${error}`);
      }
      console.log('src/index.js created.');

      // Optional: uncomment to create _layout.tsx if needed
      // const layoutPath = path.join(newAppDirPath, '_layout.tsx');
      // fs.writeFile(layoutPath, layoutContent, (error) => {
      //   if (error) {
      //     return console.error(`Error creating _layout.tsx: ${error}`);
      //   }
      //   console.log('src/_layout.tsx created.');
      // });
    });
  });
});
