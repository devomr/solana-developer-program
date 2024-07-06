Notes:

* Multiple instructions can be packed into a transaction
* The instructions are processed synchronously, in order and atomic. If any instruction fails, the entire transaction fails
* If you want to process instructions in parallel, you should fire multiple transactions