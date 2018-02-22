# RGB Client

### A web client application used in the context of the RGB-IOT project 

RBB Client is a set of controls for remote LED lights.
The client calls an API that will result in the control of remote lights.

The backend Node server code is here:
https://github.com/joseherminiocollas/rgb-agent/tree/f35f6ed1ccc44d6890117c9b3b4e83accf306c24

The User Interface consists of:

3 slider controls, one each for red, green and blue.

A selection component, enabling selection of an effect.
Currently, effects supported are: 'glow', 'red-blue', 'chase'

A selection component, enabling the user to select a device or all the devices.

These components, when changed will send calls to a back-end Node server.
This back-end service will make the actual calls to control the lights on the device.


This build is based on a fork of:

The origianl starter 'webpack-babel-starter' repository is here:

    https://github.com/topheman/webpack-babel-starter


Currently the fork is a branch that I am using to start specifically Cycle.js applications.

    https://github.com/JoseHerminioCollas/webpack-babel-starter/tree/cycle-start


