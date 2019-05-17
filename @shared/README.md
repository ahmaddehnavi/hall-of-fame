#how to use
```typescript 
import {SomeComponent} from '@shared';
```

#how to add new module
1. first create an folder for your module 
in corresponding category (components, services, utils, ... ).
2. then create module file.
3. finally add an export statement for it in the category's **index.ts** file.

**`important note : do not import from index inside @shared modules
 because it can create a cilcular dependency issue.
 and resolve to an undefined imported value`**
