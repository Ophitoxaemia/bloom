# bloom

Bloom filter with remove. Not for production use. 

One of the first facts you learn about Bloom filters is that they don't support removal of an item. 

The Bloom filter was invented in 1970, when we did have to conserve every precious byte. Today things are different, so for fun I combined a couple of concepts to implement remove.

Tested with Firefox 74.0, Ubuntu 18.04 LTS, @vue/cli 4.1.2, node v12.14.1

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
