export interface MemberInfo {
    memberId: number;
    firstName: string;
    lastName: string;
    dBreakfast?: number; // d for default
    dLunch?: number;
    dDinner?: number;
    userId?: number; // nullable
    photoUrl?: string;
    profession?: string;
}
