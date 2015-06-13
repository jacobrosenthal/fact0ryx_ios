fact0ryx_ios
------------
Currently a playground for react-native and ibeacons created in residence at fact0ryx. 

```
git clone git@github.com:jacobrosenthal/fact0ryx_ios.git
cd fact0ryx_ios
npm i
open fact0ryx_ios.xcodeproj
```

If your test target is an actual device, get desktop and target on same wifi and replace localhost in AppDelegate.m with your ip address of desktop. (NOTE: I find this just doesn't work on some networks, probably some firewalling going on?)

While iOS no longer allows simulating bluetooth, Estimote sdk and react-native-estimote does, so you may simulate as well.
