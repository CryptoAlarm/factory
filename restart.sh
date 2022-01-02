rm -rf ./node_modules
pm2 stop factory
yarn install
yarn build
pm2 delete factory
pm2 start yarn --name factory -- start
