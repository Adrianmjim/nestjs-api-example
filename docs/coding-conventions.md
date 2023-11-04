# Coding conventions

## Writing functions

1. A function must have a return type.

Example of incorrect function:

```typescript
function isOdd(number: number) {
  let isOdd: boolean;
  
  if (number % 2) {
    isOdd = false;
  } else {
    isOdd = true;
  }

  return isOdd;
}
```

Example of correct function:

```typescript
function isOdd(number: number): boolean {
  let isOdd: boolean;
  
  if (number % 2) {
    isOdd = false;
  } else {
    isOdd = true;
  }

  return isOdd;
}
```

2. A function must have all its parameters typed.

Example of incorrect function:

```typescript
function isOdd(number): boolean {
  let isOdd: boolean;
  
  if (number % 2) {
    isOdd = false;
  } else {
    isOdd = true;
  }

  return isOdd;
}
```

Example of correct function:

```typescript
function isOdd(number: number): boolean {
  let isOdd: boolean;
  
  if (number % 2) {
    isOdd = false;
  } else {
    isOdd = true;
  }

  return isOdd;
}
```

3. A function must have a single return statement.

Example of incorrect function:

```typescript
function isOdd(number: number): boolean {
  if (number % 2) {
    return false;
  } else {
    return true;
  }
}
```

Example of correct function:

```typescript
function isOdd(number: number): boolean {
  let isOdd: boolean;
  
  if (number % 2) {
    isOdd = false;
  } else {
    isOdd = true;
  }

  return isOdd;
}
```

4. A function must returns variables instead of values

Example of incorrect function:

```typescript
function getNumber2(): number {
  return 2;
}
```

Example of correct function:

```typescript
function getNumber2(): number {
  const numberTwo: number = 2;

  return numberTwo;
}
```

