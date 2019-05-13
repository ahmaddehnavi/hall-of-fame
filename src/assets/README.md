
# how to add new asset
put assets file in corresponding dir then add it to **Assets.ts** 

#how to use assets
import Assets.ts and use it. for example **Assets.sounds.test**


never import assets directly
for example
 `require('../../assets/images/1.gif) ` or 
 `import test from '../../assets/images/1.gif`
is bad practice because it is not type safe and also make refactor harder.  
 
 
