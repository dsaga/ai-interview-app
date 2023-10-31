export declare const interviewRoles: {
    readonly FRONT_END_DEVELOPER: "Front End Developer";
    readonly BACK_END_DEVELOPER: "Back End Developer";
    readonly FULL_STACK_DEVELOPER: "Full Stack Developer";
    readonly DEVOPS: "DevOps";
    readonly QA: "QA";
    readonly TECHNICAL_ARCHITECT: "Technical Architect";
    readonly TECHNICAL_LEAD: "Technical Lead";
    readonly TECHNICAL_MANAGER: "Technical Manager";
    readonly PRODUCT_MANAGER: "Product Manager";
    readonly PROJECT_MANAGER: "Project Manager";
    readonly SCRUM_MASTER: "Scrum Master";
    readonly BUSINESS_ANALYST: "Business Analyst";
    readonly DATA_SCIENCE: "Data Science";
    readonly MACHINE_LEARNING: "Machine Learning";
    readonly AI: "AI";
    readonly BLOCKCHAIN: "Blockchain";
    readonly CLOUD: "Cloud";
    readonly CYBER_SECURITY: "Cyber Security";
    readonly IT_SUPPORT: "IT Support";
    readonly IT_INFRASTRUCTURE: "IT Infrastructure";
};
export type interviewRoleKeys = keyof typeof interviewRoles;
export declare const experienceLevels: {
    readonly JUNIOR: "Junior";
    readonly MEDIOR: "Medior";
    readonly SENIOR: "Senior";
    readonly STAFF: "Staff";
    readonly PRINCIPAL: "Principal";
};
export type experienceLevelKeys = keyof typeof experienceLevels;
export declare const interviewQuestionsCount: readonly [5, 10, 15, 20];