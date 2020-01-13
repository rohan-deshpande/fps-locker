# FPS Locker

<!-- toc -->

- [Why?](#why)
- [Usage](#usage)
  * [Installation](#installation)
  * [Module](#module)
  * [Script Tag](#script-tag)
- [Usage with Three.js](#usage-with-threejs)

<!-- tocstop -->

## Why?

Maintaining a steady frame rate in on a wide variety of devices and screens that refresh at different rates is challenging. The browser's own `requestAnimationFrame` API does not really provide a way to do this natively, and many popular solutions posted on StackOverflow and other forums are either bug prone or do not accommodate for edge cases such as a user navigating away from a window/tab that is running `requestAnimationFrame` and then coming back later.

`fps-locker` attempts to solve these issues through a dead simple API that is agnostic of how your animation workflow works. As a default, it will ensure that if animation frames _can_ update at 60FPS on the device they are rendering on, then they will. This is of course not possible if your application is slow or the machine it is running on does not have enough resources to maintain a high frame rate. It is also possible to update at a different FPS.

## Usage

### Installation

```
npm i -S fps-locker
```

### Module

```javascript
import FpsLocker from 'fps-locker';

const updater = new FpsLocker(() => {
  allMyAnimations();
});

const render = () => {
  const animate = now => {
    requestAnimationFrame(animate);
    updater.update();
  };
};

render();
```

### Script Tag

In your HTML `<head>`:

```html
<script src="/path/to/fps-locker.js"></script>
```

In your app:

```javascript
const updater = new window.FpsLocker(() => {
  allMyAnimations();
});

const render = () => {
  const animate = now => {
    requestAnimationFrame(animate);
    updater.update();
  };
};

render();
```

## Usage with Three.js

It's advised that you call your Three app's `renderer.render` method **after** your updates have performed and not within the supplied update function itself.

```javascript
import FpsLocker from 'fps-locker';

const updater = new FpsLocker(() => {
  allMyAnimations();
});

const render = () => {
  const animate = now => {
    requestAnimationFrame(animate);
    updater.update();
    myThreeWebGlRenderer.render(myScene, myCamera);
  };
};

render();
```
