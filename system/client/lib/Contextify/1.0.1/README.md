<p float="left>
 <a href="https://fontawesome.com/">
  <img alt="Supports FontAwesome!" src="https://img.shields.io/badge/supports-fontawesome-blue?style=for-the-badge" style="display: inline-block;">
 </a>
 <img alt="GitHub Download Count" src="https://img.shields.io/github/downloads/jacoobia/Contextify/total?style=for-the-badge" style="display: inline-block;">
</p>

<br/>

# Contextify

<br/>

A lightweight vanilla JavaScript context menu library with FontAwesome support. <br/>
This library was written for use in a personal project of mine as an AIO solution for the features of a context menu that I wanted that I could only find spread across multiple different context menu libraries. This is very early doors and I will continue to maintain this however slowly that may be as I build my personal projects and use cases change or the need for features arise.

# Usage

```
    //Construct our menu buttons 
    const menuButtons = [
        { icon: 'fa-camera', type: 'button', text: 'Screenshot', click: screenshot },
        { icon: 'fa-times-circle', type: 'button', text: 'Cancel', click: (event) => { menu.hide(false); }}
    ];
    //Create our new Contextify object with the buttons, theme, container
    const menu = new Contextify(menuButtons, "dark", document.body);
```

Which creates the following menu (note, the example requires you to have a form of FontAwesome installed):
![Example Menu](https://by3301files.storage.live.com/y4meHtRWf5VBnb5SxLdxHbo-apkdGGw8MCFqGiW-T7sUl7KSlJkkWMDMwZeTXBDCFw7qZqbCUZ58hPljmvqTTxu7mm819PPWu_PpmtJLw-rXW50bzstHEQotokCZgFbU6Wy4lYt2824E7pbUON25EnoqboF1ASE8-c7OwIgUp_8P-HdzcGSOcxR_Lb7K-f5JY2K?width=252&height=84&cropmode=none)

                                                   
Disclaimer: This has only been tested on desktop, MacOS and Windows 10. I have not tested this on any mobile devices.
<img src="https://user-images.githubusercontent.com/15943248/128567733-a9b1c10d-6bcd-4015-ae76-946c58738626.png" width="480" height="300" /> <img src="https://user-images.githubusercontent.com/15943248/128567735-3a9402fe-8b84-46d7-add9-6e63a6ffa5cc.PNG" width="480" height="300" />
