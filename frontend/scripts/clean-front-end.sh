s#!/usr/bin/env bash
# fail if any commands fails
set -e
# debug log
set -x
echo "Cleaning frontend..."
echo "rm -rf ios/build..."
rm -rf ios/build
echo "rm -rf android/app/build..."
rm -rf android/app/build
echo "Removed all Xcode derived data..."
rm -rf ~/Library/Developer/Xcode/DerivedData
echo "-rf ~/.rncache..."
rm -rf ~/.rncache
echo "rm -rf node_modules..."
rm -rf node_modules
echo "rm -rf $TMPDIR/react-*..."
rm -rf $TMPDIR/react-*; rm -rf $TMPDIR/haste-*; rm -rf $TMPDIR/metro-*; watchman watch-del-all
cd ios
xcodebuild clean
cd ../
echo "yarn install..."
yarn install
echo "yarn start --reset-cache..."
yarn start --reset-cache
echo "frontend cleaned"
