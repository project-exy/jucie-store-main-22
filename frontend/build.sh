#!/bin/bash

npm run build
rm -rf ../backend/static/dist
mv ./dist ../backend/static/