I need to use React Context for Global State Management since my app requires dynamic values which allows them to be accessed and updated across multiple components (like Accounts, Expenses, and Income).

Whenever the user interacts with the accounts, expenses, or income sections, you can update the context, which will trigger an automatic re-render wherever these values are used.

In order to create context in React file we need to import:

```
import React, { createContext, useContext, useState, ReactNode } from 'react';
```

After that we need to use createContext function. This is a function provided by React to create a context object. Context allows us to create a global state that can be shared across multiple components in a React application without needing to pass props down through every level of the component tree. It essentially allows you to store data that can be accessed by any component that subscribes to that context.

When we initialize a context with createContext, we’re setting the default value for that context, like this `createContext(null)`. Setting null as the default is a way to indicate that the context doesn’t have any value initially. This also tells React that the actual value will be provided later (when we create a Provider component). Later in our setup, we’ll use a Provider component to wrap parts of our app that need access to this context. The Provider will set the actual value of the context that we created, so it’s no longer null.

The reason we use null instead of 0 here is that the value we pass to createContext represents the entire context object, not just the initial values for individual numbers like netWorth, income, etc. This initial value (null) is more of a placeholder for the context itself, rather than an actual financial value. Using null indicates that we don’t have a real, usable value yet. It helps remind us that we’ll later provide the actual values via a Provider component. Our context will contain multiple pieces of data (like netWorth, income, expenses), as well as functions to update them. 0 wouldn’t make sense here because we’re not setting just a single numeric value; we’re creating a more complex structure to hold all financial data and functions. By setting the default to null, we’ll get an error if we accidentally try to use FinancialContext without wrapping our components in a Provider. This is a helpful safety feature, as it ensures that all components that use FinancialContext will only work when the actual data is provided.

The Provider is a special component that supplies the actual data and functions (netWorth, income, updateIncome, etc.) to all the components that need them. Any component wrapped inside this Provider will be able to access the FinancialContext.
