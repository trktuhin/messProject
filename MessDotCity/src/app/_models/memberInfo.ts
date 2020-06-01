export interface MemberInfo {
    id?: number;
    firstName: string;
    lastName: string;
    dBreakfast?: number; // d for default
    dLunch?: number;
    dDinner?: number;
    userId?: string; // nullable
    photoName?: string;
    profession?: string;
    mobile?: string;
}
