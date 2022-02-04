export type RegisterInfoType = {
    image: string
    serviceName: string
    signFunction: () => Promise<void>
}