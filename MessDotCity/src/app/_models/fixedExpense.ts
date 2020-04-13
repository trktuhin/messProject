export interface FixedExpense {
    id?: number;
    expenseName: string;
    expenseAmount: number;
    expenseDate?: Date;
    remarks?: string;
}