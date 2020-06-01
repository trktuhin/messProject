export interface DailyExpense{
    id?: number;
    day: any;
    expense: number;
    messId?: number;
    responsibleMember?: string;
    totalMeal: number;
}

export interface MealForMember {
    memberId: number;
    memberName: string;
    breakfast: number;
    lunch: number;
    dinner: number;
    photoUrl: string;
}