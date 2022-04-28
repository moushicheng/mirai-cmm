#!/bin/sh
clear # Clean out put
tsc
node --inspect dist/src/index.js
# node inspect dist/src/index.js