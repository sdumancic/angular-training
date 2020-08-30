// Class generics
class ValueHolder<T>{
    value: T;
}
const v : ValueHolder<number> = new ValueHolder();
v.value = 10;

// Function generics
const valueWrapper = <T>(value: T): T[] => {
    return [value];
}
valueWrapper<number>(10);


