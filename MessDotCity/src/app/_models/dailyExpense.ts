export interface DailyExpense{
    expenseDate: any;
    totalExpense: number;
    responsiblePerson?: string;
    meals: MealForMember[];
}

export interface MealForMember {
    memberId: number;
    memberName: string;
    breakfast: number;
    lunch: number;
    dinner: number;
    photoUrl: string;
}