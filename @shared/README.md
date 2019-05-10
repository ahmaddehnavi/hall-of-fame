#how to use
```typescript 
import {SomeComponent} from '@shared';
```

#naming conversion
all exported module should be start with **PX** prefix (ex: PXScreen) 

#how to add new module
1. first create an folder for your module 
in corresponding category (components, services, utils, ... ).
2. then create module file.
3. finally add an export statement for it in the category's **index.ts** file.