# where should I defined store
 * screen related store should be create in related screen directory
 * if store is related to whole app should be place in stores directory (probably only one app store is enough)

# inject name
all store should name a static `NAME` property and inject store instance in `App.tsx` with that name.
you also should create a type like below for each store

```
export type Injected{$StoreName}Props = {
    InjectName : StoreName
} 
```
for example if inject name is `'$test'` and store name is  `'TestStore'` then :  
```
export type InjectedTestStoreProps = {
    $test : TestStore
} 
```