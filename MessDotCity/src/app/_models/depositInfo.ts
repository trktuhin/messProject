export interface DepositInfo {
    depositId?: number;
    depositDate: Date;
    depositAmount: number;
    remarks?: string;
    memberId?: number;
    depositType?: string;
}