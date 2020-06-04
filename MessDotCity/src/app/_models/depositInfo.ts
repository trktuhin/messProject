export interface DepositInfo {
    memberId?: number;
    firstName: string;
    lastName: string;
    photoName: string;
    depositType?: string;
    totalDebit: number;
    totalCredit: number;
    totalMeals?: number;
}