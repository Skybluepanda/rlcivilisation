import { persistentAtom } from 'hooks/persistentAtom';

//Buildings that are queued. THeir infrastructure and wealthCost has been paid.
//Order somewhat matters.
//Per jobCost Progress/Goal (income) Job workercount
//Each cost will give a turn estimate. Use the biggest one and display it in the queue.
//No need for queue lmao!.